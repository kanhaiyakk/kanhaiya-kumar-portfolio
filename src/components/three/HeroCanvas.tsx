import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Icosahedron, Torus, TorusKnot, MeshDistortMaterial } from "@react-three/drei";

/**
 * Hero 3D scene — a glowing distorted icosahedron (the "core") with
 * orbiting torus rings & a knot. Pure procedural geometry so no GLB needed.
 */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#3b82f6" />

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[1.4, 4]}>
          <MeshDistortMaterial
            color="#22d3ee"
            distort={0.45}
            speed={2}
            roughness={0.15}
            metalness={0.85}
            emissive="#0891b2"
            emissiveIntensity={0.4}
          />
        </Icosahedron>
      </Float>

      <Float speed={0.8} rotationIntensity={1.2} floatIntensity={0.6}>
        <Torus args={[2.2, 0.04, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#0ea5e9"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </Torus>
      </Float>

      <Float speed={1.0} rotationIntensity={0.8} floatIntensity={0.8}>
        <Torus args={[2.6, 0.03, 16, 100]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </Torus>
      </Float>

      <Float speed={1.4} rotationIntensity={1.5} floatIntensity={1.2}>
        <TorusKnot args={[0.4, 0.12, 100, 16]} position={[2.8, 1.5, -1]}>
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.1}
          />
        </TorusKnot>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.4}
      />
    </>
  );
}

export function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
