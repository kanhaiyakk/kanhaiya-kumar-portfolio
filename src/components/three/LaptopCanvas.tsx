import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural laptop 3D model — base + screen with glowing code-like lines.
 * No external GLB needed.
 */
function Laptop() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.35;
  });

  const codeLines = [
    "public class Backend {",
    "  @RestController",
    "  api.get(\"/users\")",
    "  return ResponseEntity.ok();",
    "}",
  ];

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Base */}
      <RoundedBox args={[3.2, 0.15, 2.2]} radius={0.06} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.85} roughness={0.3} />
      </RoundedBox>
      {/* Trackpad */}
      <mesh position={[0, 0.081, 0.5]}>
        <boxGeometry args={[1.1, 0.005, 0.7]} />
        <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Keyboard hint */}
      <mesh position={[0, 0.081, -0.3]}>
        <boxGeometry args={[2.6, 0.005, 1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Screen — tilted back */}
      <group position={[0, 0.08, -1.05]} rotation={[-Math.PI / 6, 0, 0]}>
        <RoundedBox args={[3.2, 2, 0.1]} radius={0.05} smoothness={4} position={[0, 1, 0]}>
          <meshStandardMaterial color="#0b1220" metalness={0.8} roughness={0.35} />
        </RoundedBox>
        {/* Screen display */}
        <mesh position={[0, 1, 0.052]}>
          <planeGeometry args={[3, 1.8]} />
          <meshStandardMaterial
            color="#06121f"
            emissive="#0891b2"
            emissiveIntensity={0.45}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>
        {/* Code lines */}
        {codeLines.map((line, idx) => (
          <Text
            key={idx}
            position={[-1.35, 1.6 - idx * 0.28, 0.06]}
            fontSize={0.13}
            color="#7dd3fc"
            anchorX="left"
            anchorY="middle"
            maxWidth={2.8}
          >
            {line}
          </Text>
        ))}
      </group>
    </group>
  );
}

export function LaptopCanvas() {
  return (
    <Canvas camera={{ position: [0, 1.2, 5], fov: 40 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[-3, 2, 3]} intensity={0.7} color="#22d3ee" />
        <pointLight position={[3, -2, -3]} intensity={0.5} color="#3b82f6" />
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
          <Laptop />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}
