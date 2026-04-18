import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface TechBallProps {
  label: string;
  position: [number, number, number];
  color: string;
}

function TechBall({ label, position, color }: TechBallProps) {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group position={position}>
        <Sphere args={[0.55, 32, 32]}>
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.25}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </Sphere>
        <Text
          position={[0, 0, 0.56]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
          textAlign="center"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function Cluster() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  const techs: TechBallProps[] = [
    { label: "Java", position: [-2.2, 1.2, 0], color: "#f89820" },
    { label: "Spring", position: [2.2, 0.8, -0.5], color: "#6db33f" },
    { label: "REST", position: [0, -1.8, 0.5], color: "#22d3ee" },
    { label: "JPA", position: [-1.8, -1, 1], color: "#3b82f6" },
    { label: "Postgres", position: [1.8, -1.2, 0.8], color: "#336791" },
    { label: "Docker", position: [0.2, 1.8, -0.8], color: "#0db7ed" },
    { label: "AWS", position: [-2.6, -0.4, -1], color: "#ff9900" },
    { label: "Junit", position: [2.4, -0.2, 0.8], color: "#25a162" },
  ];

  return (
    <group ref={group}>
      {techs.map((t) => (
        <TechBall key={t.label} {...t} />
      ))}
    </group>
  );
}

export function TechCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.6} color="#22d3ee" />
        <Cluster />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Suspense>
    </Canvas>
  );
}
