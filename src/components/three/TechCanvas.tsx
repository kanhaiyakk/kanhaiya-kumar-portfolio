import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls, Float, Text, Sphere, useCursor } from "@react-three/drei";
import * as THREE from "three";

interface TechBallProps {
  label: string;
  position: [number, number, number];
  color: string;
  isActive: boolean;
  onSelect: (label: string) => void;
}

function TechBall({ label, position, color, isActive, onSelect }: TechBallProps) {
  const [hovered, setHovered] = useState(false);
  const sphereRef = useRef<THREE.Mesh>(null!);
  useCursor(hovered);

  useFrame((_, delta) => {
    if (!sphereRef.current) return;

    const targetScale = hovered || isActive ? 1.16 : 1;
    const nextScale = THREE.MathUtils.damp(sphereRef.current.scale.x, targetScale, 5, delta);
    sphereRef.current.scale.setScalar(nextScale);
    sphereRef.current.rotation.y += delta * 0.5;
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(label);
  };

  return (
    <Float speed={2} rotationIntensity={hovered ? 1.1 : 0.8} floatIntensity={isActive ? 2 : 1.5}>
      <group
        position={position}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <Sphere ref={sphereRef} args={[0.55, 32, 32]}>
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={hovered ? 0.18 : 0.25}
            emissive={color}
            emissiveIntensity={isActive ? 0.55 : hovered ? 0.4 : 0.25}
          />
        </Sphere>
        {(hovered || isActive) && (
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.2}>
            <torusGeometry args={[0.62, 0.03, 16, 100]} />
            <meshStandardMaterial
              color="#7dd3fc"
              emissive="#22d3ee"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        )}
        <Billboard>
          <Text
            position={[0, 0, 0.6]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.2}
            textAlign="center"
            outlineWidth={0.012}
            outlineColor="#000000"
          >
            {label}
          </Text>
          {(hovered || isActive) && (
            <Text
              position={[0, -0.95, 0]}
              fontSize={0.14}
              color="#7dd3fc"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              {isActive ? "Selected" : "Tap me"}
            </Text>
          )}
        </Billboard>
      </group>
    </Float>
  );
}

interface ClusterProps {
  activeLabel: string;
  onSelect: (label: string) => void;
}

function Cluster({ activeLabel, onSelect }: ClusterProps) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08;
  });

  const techs = useMemo<Array<{ label: string; position: [number, number, number]; color: string }>>(
    () => [
      { label: "Java", position: [-2.4, 1.3, 0], color: "#f89820" },
      { label: "Spring Boot", position: [2.3, 1.0, -0.4], color: "#6db33f" },
      { label: "REST APIs", position: [0, -2.0, 0.5], color: "#22d3ee" },
      { label: "Postgres", position: [-1.9, -1.1, 1], color: "#336791" },
      { label: "Docker", position: [1.9, -1.3, 0.8], color: "#0db7ed" },
      { label: "AWS", position: [-2.7, -0.2, -1], color: "#ff9900" },
      { label: "LLMs", position: [0.3, 2.0, -0.7], color: "#a855f7" },
      { label: "AI", position: [2.5, -0.1, 0.9], color: "#ec4899" },
    ],
    [],
  );

  return (
    <group ref={group}>
      {techs.map((t) => (
        <TechBall key={t.label} {...t} isActive={activeLabel === t.label} onSelect={onSelect} />
      ))}
    </group>
  );
}

export function TechCanvas() {
  const [activeLabel, setActiveLabel] = useState("Java");

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} onPointerMissed={() => setActiveLabel("")}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.6} color="#22d3ee" />
        <Cluster activeLabel={activeLabel} onSelect={setActiveLabel} />
        <Text
          position={[0, -3.1, 0]}
          fontSize={0.18}
          color="#7dd3fc"
          anchorX="center"
          anchorY="middle"
          maxWidth={6}
          textAlign="center"
        >
          {activeLabel ? `${activeLabel} · click a sphere to explore the stack` : "Click any sphere to explore the stack"}
        </Text>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={activeLabel ? 0.7 : 1.2} />
      </Suspense>
    </Canvas>
  );
}
