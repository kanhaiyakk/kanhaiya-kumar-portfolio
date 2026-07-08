import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type SkillPlanet = {
  title: string;
  color: string;
  size: number;
};

// Distribute nodes evenly on a sphere shell (Fibonacci sphere)
function fibonacciSphere(n: number, radius: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius * 0.85, Math.sin(theta) * r * radius]);
  }
  return pts;
}

// Connect each node to its k nearest neighbours (deduped)
function buildEdges(pts: [number, number, number][], k = 2): [number, number][] {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    const dists = pts
      .map((p, j) => ({ j, d: dist(pts[i], p) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const { j } of dists) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push(i < j ? [i, j] : [j, i]);
    }
  }
  return edges;
}

function dist(a: [number, number, number], b: [number, number, number]) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

type NodeProps = {
  data: SkillPlanet;
  active: boolean;
  connected: boolean;
  register: (g: THREE.Group | null) => void;
  onSelect: (title: string) => void;
};

function Node({ data, active, connected, register, onSelect }: NodeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const highlight = hovered || active;

  useFrame((state) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + data.title.length) * 0.06;
    const target = highlight ? 1.6 : connected ? 1.15 : 1;
    if (mesh.current) mesh.current.scale.lerp(new THREE.Vector3(target, target, target).multiplyScalar(pulse), 0.15);
    if (halo.current) {
      const ht = highlight ? 2.6 : 1.9;
      halo.current.scale.lerp(new THREE.Vector3(ht, ht, ht), 0.15);
      (halo.current.material as THREE.MeshBasicMaterial).opacity = highlight ? 0.28 : 0.12;
    }
  });

  const dim = active === false && connected === false;

  return (
    <group ref={register}>
      {/* soft halo */}
      <mesh ref={halo}>
        <sphereGeometry args={[data.size, 16, 16]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      {/* node core */}
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data.title);
        }}
      >
        <icosahedronGeometry args={[data.size, 1]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={highlight ? 1.8 : 0.7}
          metalness={0.5}
          roughness={0.25}
          flatShading
        />
      </mesh>
      <Html center distanceFactor={8} position={[0, data.size + 0.34, 0]}>
        <div
          onClick={() => onSelect(data.title)}
          style={{ cursor: "pointer", opacity: dim ? 0.45 : 1 }}
          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold transition-all duration-200 ${
            highlight
              ? "bg-primary text-primary-foreground scale-110 shadow-lg"
              : "bg-background/70 text-foreground/80 backdrop-blur-sm"
          }`}
        >
          {data.title}
        </div>
      </Html>
    </group>
  );
}

type NeuralNetProps = {
  nodes: SkillPlanet[];
  active: string | null;
  onSelect: (title: string) => void;
};

function NeuralNetwork({ nodes, active, onSelect }: NeuralNetProps) {
  const n = nodes.length;
  const base = useMemo(() => fibonacciSphere(n, 2.6), [n]);
  const edges = useMemo(() => buildEdges(base, 2), [base]);

  const activeIndex = active ? nodes.findIndex((x) => x.title === active) : -1;
  const connectedSet = useMemo(() => {
    const s = new Set<number>();
    if (activeIndex < 0) return s;
    for (const [a, b] of edges) {
      if (a === activeIndex) s.add(b);
      if (b === activeIndex) s.add(a);
    }
    return s;
  }, [edges, activeIndex]);

  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const rootRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const live = useRef<Float32Array>(new Float32Array(n * 3));

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edges.length * 6), 3));
    return g;
  }, [edges]);

  // travelling data pulses along a subset of edges
  const pulses = useMemo(
    () =>
      edges.map((e) => ({
        edge: e,
        speed: 0.25 + Math.random() * 0.45,
        offset: Math.random(),
        color: nodes[e[0]].color,
      })),
    [edges, nodes],
  );
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rootRef.current) rootRef.current.rotation.y = t * 0.12;

    // gentle drift for each node + capture live positions
    for (let i = 0; i < n; i++) {
      const b = base[i];
      const x = b[0] + Math.sin(t * 0.5 + i) * 0.14;
      const y = b[1] + Math.cos(t * 0.4 + i * 1.3) * 0.14;
      const z = b[2] + Math.sin(t * 0.6 + i * 0.7) * 0.14;
      live.current[i * 3] = x;
      live.current[i * 3 + 1] = y;
      live.current[i * 3 + 2] = z;
      const g = groupRefs.current[i];
      if (g) g.position.set(x, y, z);
    }

    // update synapse lines
    const geo = lineRef.current?.geometry;
    if (geo) {
      const arr = geo.attributes.position.array as Float32Array;
      let k = 0;
      for (const [a, b] of edges) {
        arr[k++] = live.current[a * 3];
        arr[k++] = live.current[a * 3 + 1];
        arr[k++] = live.current[a * 3 + 2];
        arr[k++] = live.current[b * 3];
        arr[k++] = live.current[b * 3 + 1];
        arr[k++] = live.current[b * 3 + 2];
      }
      geo.attributes.position.needsUpdate = true;
    }

    // move travelling pulses
    pulses.forEach((p, i) => {
      const m = pulseRefs.current[i];
      if (!m) return;
      const tt = (t * p.speed + p.offset) % 1;
      const [a, b] = p.edge;
      m.position.set(
        live.current[a * 3] + (live.current[b * 3] - live.current[a * 3]) * tt,
        live.current[a * 3 + 1] + (live.current[b * 3 + 1] - live.current[a * 3 + 1]) * tt,
        live.current[a * 3 + 2] + (live.current[b * 3 + 2] - live.current[a * 3 + 2]) * tt,
      );
    });
  });

  return (
    <group ref={rootRef}>
      {/* synapse connections */}
      <lineSegments ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.22} />
      </lineSegments>

      {/* travelling data pulses */}
      {pulses.map((p, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}

      {/* nodes */}
      {nodes.map((data, i) => (
        <Node
          key={data.title}
          data={data}
          active={active === data.title}
          connected={connectedSet.has(i)}
          register={(g) => (groupRefs.current[i] = g)}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

type TechCanvasProps = {
  planets?: SkillPlanet[];
  active?: string | null;
  onSelect?: (title: string) => void;
};

export function TechCanvas({ planets = [], active = null, onSelect = () => {} }: TechCanvasProps) {
  return (
    <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0.2, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#22d3ee" />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#a855f7" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" />

        <Stars radius={60} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />

        <NeuralNetwork nodes={planets} active={active} onSelect={onSelect} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} rotateSpeed={0.4} />
      </Suspense>
    </Canvas>
  );
}
