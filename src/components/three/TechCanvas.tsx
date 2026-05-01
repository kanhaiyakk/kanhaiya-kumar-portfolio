import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { forwardRef, Suspense, useRef } from "react";
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
      <icosahedronGeometry args={[1.4, 4]} />
      <MeshDistortMaterial
        color="#22d3ee"
        emissive="#0891b2"
        emissiveIntensity={0.4}
        roughness={0.15}
        metalness={0.85}
        distort={0.45}
        speed={1.6}
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

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.PI / 2.4;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.6, 0.015, 16, 200]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
    </mesh>
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#22d3ee" />
        <directionalLight position={[-5, -3, -5]} intensity={0.7} color="#a855f7" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#ffffff" />

        <Stars radius={50} depth={40} count={1800} factor={3} saturation={0} fade speed={1} />

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <CoreOrb />
        </Float>

        <Ring />

        <OrbitingShape radius={2.4} speed={0.5} offset={0} color="#22d3ee" kind="sphere" size={0.16} />
        <OrbitingShape radius={2.4} speed={0.5} offset={Math.PI * 0.66} color="#a855f7" kind="ico" size={0.22} />
        <OrbitingShape radius={2.4} speed={0.5} offset={Math.PI * 1.33} color="#f0abfc" kind="knot" size={0.14} />
        <OrbitingShape radius={3.2} speed={-0.3} offset={Math.PI * 0.4} color="#67e8f9" kind="sphere" size={0.1} />
        <OrbitingShape radius={3.2} speed={-0.3} offset={Math.PI * 1.4} color="#c084fc" kind="ico" size={0.18} />

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
