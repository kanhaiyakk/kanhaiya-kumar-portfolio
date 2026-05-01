import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Stars, Sphere } from "@react-three/drei";
import { forwardRef, Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

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

export function TechCanvas() {
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

        <Ring radius={2.4} tilt={Math.PI / 2.4} color="#22d3ee" speed={0.12} />
        <Ring radius={2.8} tilt={Math.PI / 3} color="#a855f7" speed={-0.08} />
        <Ring radius={3.2} tilt={Math.PI / 2.1} color="#67e8f9" speed={0.06} />

        <OrbitingShape radius={2.4} speed={0.45} offset={0} color="#22d3ee" kind="sphere" size={0.16} />
        <OrbitingShape radius={2.4} speed={0.45} offset={Math.PI * 0.66} color="#a855f7" kind="ico" size={0.2} />
        <OrbitingShape radius={2.4} speed={0.45} offset={Math.PI * 1.33} color="#f0abfc" kind="sphere" size={0.14} />
        <OrbitingShape radius={3.2} speed={-0.3} offset={Math.PI * 0.4} color="#67e8f9" kind="sphere" size={0.1} />
        <OrbitingShape radius={3.2} speed={-0.3} offset={Math.PI * 1.4} color="#c084fc" kind="sphere" size={0.16} />

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
