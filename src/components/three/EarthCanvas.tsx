import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

const EARTH_RADIUS = 1.4;
const LIGHT_DIR = new THREE.Vector3(5, 3, 5).normalize();

// Convert lat/lon (degrees) to a point on a sphere of given radius.
function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function Earth() {
  const groupRef = useRef<THREE.Group>(null!);
  const [dayMap, nightMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
  ]);

  // Custom day/night blended shader material.
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayMap },
        nightTexture: { value: nightMap },
        sunDirection: { value: LIGHT_DIR.clone() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vec3 sunDirView = normalize((viewMatrix * vec4(sunDirection, 0.0)).xyz);
          float intensity = dot(normalize(vNormal), sunDirView);
          float mixAmount = smoothstep(-0.15, 0.25, intensity);
          vec3 dayColor = texture2D(dayTexture, vUv).rgb;
          vec3 nightColor = texture2D(nightTexture, vUv).rgb * 1.4;
          vec3 color = mix(nightColor, dayColor, mixAmount);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, [dayMap, nightMap]);

  // Atmospheric fresnel glow shader.
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color("#3ab7ff") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          float intensity = pow(0.75 - dot(vNormal, -vPositionNormal), 2.5);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  const bengaluruPos = useMemo(
    () => latLonToVec3(12.97, 77.59, EARTH_RADIUS * 1.005),
    []
  );
  const markerRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2.5) * 0.35;
    if (haloRef.current) {
      haloRef.current.scale.setScalar(pulse);
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.55 - (pulse - 1) * 0.6;
    }
    if (markerRef.current) {
      markerRef.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.15);
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0.41]}>
      {/* Earth */}
      <mesh material={earthMaterial}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      </mesh>
      {/* Atmosphere */}
      <mesh material={atmosphereMaterial} scale={1.08}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      </mesh>
      {/* Bengaluru marker */}
      <group position={bengaluruPos}>
        <mesh ref={markerRef}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
        <mesh ref={haloRef}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

export function EarthCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 3, 5]} intensity={1.4} color="#ffffff" />
        <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade />
        <Earth />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
}
