import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";

function Earth() {
  return (
    <Sphere args={[1.4, 64, 64]}>
      <meshStandardMaterial
        color="#0c4a6e"
        emissive="#0891b2"
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.6}
        wireframe
      />
    </Sphere>
  );
}

export function EarthCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-3, -3, -3]} intensity={0.6} color="#3b82f6" />
        <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade />
        <Earth />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Suspense>
    </Canvas>
  );
}
