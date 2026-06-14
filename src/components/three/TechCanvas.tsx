import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Stars, Sphere, Html, Trail } from "@react-three/drei";
import { forwardRef, Suspense, useRef, useState } from "react";
import * as THREE from "three";

export type SkillPlanet = {
  title: string;
  color: string;
  size: number;
};

const CoreOrb = forwardRef<THREE.Mesh>(function CoreOrb(_, forwardedRef) {
  const ref = useRef<THREE.Mesh | null>(null);

  const setRef = (node: THREE.Mesh | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={setRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color="#22d3ee"
        emissive="#0891b2"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={1.4}
      />
    </mesh>
  );
});

type OrbitingShapeProps = {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size?: number;
  kind?: "sphere" | "knot" | "ico";
};

const OrbitingShape = forwardRef<THREE.Mesh, OrbitingShapeProps>(function OrbitingShape(
  { radius, speed, offset, color, size = 0.18, kind = "sphere" },
  forwardedRef,
) {
  const ref = useRef<THREE.Mesh | null>(null);

  const setRef = (node: THREE.Mesh | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.6) * 0.6;
    ref.current.rotation.x += 0.02;
    ref.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={setRef}>
      {kind === "knot" && <torusKnotGeometry args={[size, size * 0.3, 80, 12]} />}
      {kind === "ico" && <icosahedronGeometry args={[size, 0]} />}
      {kind === "sphere" && <sphereGeometry args={[size, 24, 24]} />}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
});

function Ring({ radius, tilt, color, speed }: { radius: number; tilt: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 200]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[1.7, 64, 64]}>
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} side={THREE.BackSide} />
    </Sphere>
  );
}

type PlanetProps = {
  data: SkillPlanet;
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
  active: boolean;
  onSelect: (title: string) => void;
};

function Planet({ data, radius, speed, offset, tilt, active, onSelect }: PlanetProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (group.current) {
      group.current.position.x = Math.cos(t) * radius;
      group.current.position.z = Math.sin(t) * radius;
      group.current.position.y = Math.sin(t) * Math.tan(tilt) * 0.4;
    }
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      const target = hovered || active ? 1.4 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
    }
  });

  const highlight = hovered || active;

  return (
    <group ref={group}>
      <Trail width={highlight ? 3 : 1.5} length={6} color={data.color} attenuation={(w) => w * w} decay={1}>
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
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={highlight ? 1.4 : 0.6}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      </Trail>
      <Html center distanceFactor={9} position={[0, data.size + 0.35, 0]}>
        <div
          onClick={() => onSelect(data.title)}
          style={{ cursor: "pointer" }}
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

type TechCanvasProps = {
  planets?: SkillPlanet[];
  active?: string | null;
  onSelect?: (title: string) => void;
};

export function TechCanvas({ planets = [], active = null, onSelect = () => {} }: TechCanvasProps) {
  const ringRadii = [2.2, 2.7, 3.2, 3.7];
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 5.2], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#a855f7" />
        <pointLight position={[0, 0, 3]} intensity={0.7} color="#ffffff" />

        <Stars radius={60} depth={50} count={2500} factor={3} saturation={0} fade speed={1} />

        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
          <CoreOrb />
          <Atmosphere />
        </Float>

        {ringRadii.map((r, i) => (
          <Ring
            key={r}
            radius={r}
            tilt={Math.PI / 2.2}
            color={i % 2 === 0 ? "#22d3ee" : "#a855f7"}
            speed={i % 2 === 0 ? 0.08 : -0.06}
          />
        ))}

        {planets.map((p, i) => (
          <Planet
            key={p.title}
            data={p}
            radius={ringRadii[i % ringRadii.length]}
            speed={(i % 2 === 0 ? 0.32 : -0.28) - i * 0.01}
            offset={(i / Math.max(planets.length, 1)) * Math.PI * 2}
            tilt={0.25}
            active={active === p.title}
            onSelect={onSelect}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          rotateSpeed={0.4}
        />
      </Suspense>
    </Canvas>
  );
}
