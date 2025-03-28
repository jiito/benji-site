"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Vertex shader - handles the position of each vertex
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vNormalObject;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vNormalObject = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - handles the color of each pixel
const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vNormalObject;
  uniform float u_time;

  void main() {
    // Create a gradient based on the normal vector
    vec3 normal = normalize(vNormalObject);
    
    // Map normal coordinates to RGB color space
    // This creates a nice gradient that follows the sphere's curvature
    vec3 color = 0.5 + 0.5 * normal;
    
    // Output the color
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function GradientSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create shader uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
    }),
    []
  );

  // Update the time uniform on each frame
  useFrame((state) => {
    if (meshRef.current) {
      uniforms.u_time.value = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
