"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Line, Html } from "@react-three/drei";
import * as THREE from "three";

/** Animated AI sphere with neural-like distortion */
function AISphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#00C8FF"
          emissive="#0048FF"
          emissiveIntensity={0.3}
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
      {/* Wireframe ring */}
      <Sphere ref={wireRef} args={[1.95, 20, 20]}>
        <meshBasicMaterial
          color="#00C8FF"
          wireframe
          transparent
          opacity={0.12}
        />
      </Sphere>
    </Float>
  );
}

/** Orbit circle line helper */
function OrbitCircle({ radius, color }: { radius: number; color: string }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  return <Line points={points} color={color} lineWidth={1.2} opacity={0.25} transparent />;
}

/** Orbiting planet node with depth blur and fade */
function OrbitingNode({
  radius,
  speed,
  label,
  color,
}: {
  radius: number;
  speed: number;
  label: string;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null!);
  const labelRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
    }

    if (labelRef.current && ref.current) {
      const z = ref.current.position.z;
      if (z < -radius * 0.5) {
        const factor = Math.min(Math.abs(z + radius * 0.5) / (radius * 0.5), 1);
        const opacityValue = 1 - factor * 0.4;
        const blurValue = factor * 1.5;
        labelRef.current.style.opacity = opacityValue.toString();
        labelRef.current.style.filter = `blur(${blurValue}px)`;
        labelRef.current.style.transform = `scale(${1 - factor * 0.08})`;
      } else {
        labelRef.current.style.opacity = "1";
        labelRef.current.style.filter = "none";
        labelRef.current.style.transform = "scale(1)";
      }
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html distanceFactor={8} position={[0, 0.22, 0]} center>
        <div
          ref={labelRef}
          style={{
            color: "white",
            background: "rgba(8, 10, 18, 0.85)",
            padding: "2.5px 7px",
            borderRadius: "9999px",
            border: `1px solid ${color}44`,
            whiteSpace: "nowrap",
            fontSize: "9px",
            fontWeight: 500,
            fontFamily: "var(--font-sans, sans-serif)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
            transition: "opacity 0.1s ease, filter 0.1s ease, transform 0.1s ease",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

/** Rotating particle ring */
function ParticleRing({ radius = 3.2, count = 80, color = "#00C8FF", speed = 0.4 }: {
  radius?: number;
  count?: number;
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Points>(null!);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.3;
      pos[i * 3]     = Math.cos(angle) * (radius + spread);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }
    return [pos];
  }, [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/** Ambient floating particles */
function AmbientParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#3B82F6" size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "550px", position: "relative", display: "flex", flex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00C8FF" />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#7C3AED" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#00BFFF" distance={10} />

        <AmbientParticles count={160} />
        <AISphere />
        <ParticleRing radius={3.2} count={90} color="#00C8FF" speed={0.3} />
        <ParticleRing radius={4.0} count={60} color="#3B82F6" speed={-0.2} />

        <group rotation={[0.35, 0, 0.15]}>
          {/* Orbit 1: Web Application */}
          <group>
            <OrbitCircle radius={2.2} color="#00C8FF" />
            <OrbitingNode radius={2.2} speed={0.45} label="Web Application" color="#00C8FF" />
          </group>

          {/* Orbit 2: Android App Development */}
          <group>
            <OrbitCircle radius={2.8} color="#3B82F6" />
            <OrbitingNode radius={2.8} speed={0.37} label="Android App Development" color="#3B82F6" />
          </group>

          {/* Orbit 3: Shopify Development */}
          <group>
            <OrbitCircle radius={3.4} color="#7C3AED" />
            <OrbitingNode radius={3.4} speed={0.29} label="Shopify Development" color="#7C3AED" />
          </group>

          {/* Orbit 4: POS and ERP System */}
          <group>
            <OrbitCircle radius={4.0} color="#EC4899" />
            <OrbitingNode radius={4.0} speed={0.21} label="POS and ERP System" color="#EC4899" />
          </group>

          {/* Orbit 5: Custom Softwares */}
          <group>
            <OrbitCircle radius={4.6} color="#10B981" />
            <OrbitingNode radius={4.6} speed={0.14} label="Custom Softwares" color="#10B981" />
          </group>
        </group>
      </Canvas>
    </div>
  );
}
