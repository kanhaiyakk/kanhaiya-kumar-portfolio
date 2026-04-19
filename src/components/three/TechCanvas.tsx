import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sphere, useCursor } from "@react-three/drei";
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
              color="hsl(191 95% 68%)"
              emissive="hsl(191 95% 68%)"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        )}
        <Text
          position={[0, 0, 0.56]}
          fontSize={0.18}
          color="hsl(0 0% 100%)"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
          textAlign="center"
        >
          {label}
        </Text>
        {(hovered || isActive) && (
          <Text
            position={[0, -0.95, 0]}
            fontSize={0.12}
            color="hsl(191 95% 68%)"
            anchorX="center"
            anchorY="middle"
          >
            {isActive ? "Selected" : "Tap me"}
          </Text>
        )}
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
      { label: "Java", position: [-2.4, 1.3, 0], color: "hsl(34 92% 55%)" },
      { label: "Spring Boot", position: [2.3, 1.0, -0.4], color: "hsl(96 47% 48%)" },
      { label: "REST APIs", position: [0, -2.0, 0.5], color: "hsl(191 95% 58%)" },
      { label: "Postgres", position: [-1.9, -1.1, 1], color: "hsl(209 48% 39%)" },
      { label: "Docker", position: [1.9, -1.3, 0.8], color: "hsl(197 89% 49%)" },
      { label: "AWS", position: [-2.7, -0.2, -1], color: "hsl(36 100% 50%)" },
      { label: "LLMs", position: [0.3, 2.0, -0.7], color: "hsl(271 91% 65%)" },
      { label: "AI", position: [2.5, -0.1, 0.9], color: "hsl(328 87% 60%)" },
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
        <pointLight position={[-5, 5, -5]} intensity={0.6} color="hsl(191 95% 58%)" />
        <Cluster activeLabel={activeLabel} onSelect={setActiveLabel} />
        <Text
          position={[0, -3.1, 0]}
          fontSize={0.18}
          color="hsl(191 95% 68%)"
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
