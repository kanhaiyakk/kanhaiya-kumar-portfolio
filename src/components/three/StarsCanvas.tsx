import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

function Stars(props: any) {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    // 5000 points within a sphere
    return random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }) as Float32Array;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 18;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#7dd3fc"
          size={0.0035}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function StarsCanvas() {
  return (
    <div className="canvas-fixed">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
}
