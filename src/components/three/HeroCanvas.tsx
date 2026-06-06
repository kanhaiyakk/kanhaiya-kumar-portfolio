import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, Torus, TorusKnot, MeshDistortMaterial, RoundedBox, Stars } from "@react-three/drei";
import * as THREE from "three";

/** Smooth camera parallax that eases toward the pointer position. */
function CameraParallax() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  useFrame(() => {
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * 0.04;
    camera.lookAt(target);
  });
  return null;
}

/** Drifting ambient particle field. */
function Particles({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#67e8f9" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** A floating glass "code panel" — part of the workspace environment. */
function GlassPanel({ position, rotation, scale = 1, color = "#22d3ee" }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.9}>
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[1.6, 1.05, 0.06]} radius={0.06} smoothness={4}>
          <meshPhysicalMaterial
            color="#0b1220"
            transmission={0.6}
            thickness={0.5}
            roughness={0.15}
            metalness={0.2}
            transparent
            opacity={0.85}
            emissive={color}
            emissiveIntensity={0.08}
          />
        </RoundedBox>
        {/* glowing code lines */}
        {[0.32, 0.16, 0, -0.16, -0.32].map((y, i) => (
          <mesh key={i} position={[(-0.5 + (i % 3) * 0.1), y, 0.045]}>
            <planeGeometry args={[0.7 - (i % 3) * 0.15, 0.04]} />
            <meshBasicMaterial color={i % 2 === 0 ? color : "#a855f7"} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} color="#22d3ee" castShadow />
      <pointLight position={[-5, -3, -5]} intensity={1} color="#a855f7" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#ffffff" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={1} intensity={0.8} color="#3b82f6" />

      <Stars radius={50} depth={40} count={1500} factor={3} saturation={0} fade speed={0.8} />
      <Particles />

      {/* Central glowing core */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[1.2, 4]}>
          <MeshDistortMaterial
            color="#22d3ee"
            distort={0.4}
            speed={2}
            roughness={0.12}
            metalness={0.9}
            emissive="#0891b2"
            emissiveIntensity={0.45}
          />
        </Icosahedron>
      </Float>

      {/* Floating workspace glass panels */}
      <GlassPanel position={[2.6, 1.0, -1]} rotation={[0.1, -0.5, 0.05]} scale={0.9} color="#22d3ee" />
      <GlassPanel position={[-2.8, -0.6, -1.2]} rotation={[-0.1, 0.55, -0.06]} scale={0.85} color="#a855f7" />
      <GlassPanel position={[2.2, -1.4, -0.6]} rotation={[0.15, -0.35, -0.04]} scale={0.62} color="#60a5fa" />

      {/* Orbiting rings */}
      <Float speed={0.8} rotationIntensity={1.2} floatIntensity={0.6}>
        <Torus args={[2.2, 0.03, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#7dd3fc" emissive="#0ea5e9" emissiveIntensity={0.6} metalness={0.9} roughness={0.2} />
        </Torus>
      </Float>
      <Float speed={1.0} rotationIntensity={0.8} floatIntensity={0.8}>
        <Torus args={[2.6, 0.025, 16, 100]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
        </Torus>
      </Float>
      <Float speed={1.4} rotationIntensity={1.5} floatIntensity={1.2}>
        <TorusKnot args={[0.32, 0.1, 100, 16]} position={[-2.6, 1.6, -0.5]}>
          <meshStandardMaterial color="#a855f7" emissive="#7c3aed" emissiveIntensity={0.8} metalness={1} roughness={0.1} />
        </TorusKnot>
      </Float>

      <CameraParallax />
    </>
  );
}

export function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
