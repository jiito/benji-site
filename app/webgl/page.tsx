"use client";

import { Layout } from "../../components/Layout";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { GradientSphere } from "../../components/GradientSphere";

// Simple scene with a mesh using Three.js materials
function BasicScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </>
  );
}

// Scene with our custom gradient sphere shader
function GradientScene() {
  return (
    <>
      <GradientSphere />
      <OrbitControls />
    </>
  );
}

export default function WebGLPage() {
  const [activeTab, setActiveTab] = useState<"basic" | "gradient">("basic");

  return (
    <Layout>
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">WebGL Shader Experiments</h1>
        <p className="mb-6">
          Interactive 3D graphics using React Three Fiber with custom shaders
        </p>

        {/* Tab navigation */}
        <div className="flex mb-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "basic"
                ? "bg-blue-100 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Sphere
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "gradient"
                ? "bg-blue-100 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("gradient")}
          >
            Gradient Shader
          </button>
        </div>

        {/* Description based on active tab */}
        <div className="mb-4">
          {activeTab === "basic" && (
            <p>A basic sphere using Three.js built-in materials.</p>
          )}
          {activeTab === "gradient" && (
            <p>
              A sphere with a custom shader that creates a gradient based on
              surface normals.
            </p>
          )}
        </div>

        <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center">
                Loading 3D scene...
              </div>
            }
          >
            <Canvas camera={{ position: [0, 0, 3] }}>
              {activeTab === "basic" && <BasicScene />}
              {activeTab === "gradient" && <GradientScene />}
            </Canvas>
          </Suspense>
        </div>

        {/* Code explanation */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">How it works</h2>
          {activeTab === "basic" && (
            <div>
              <p className="mb-2">
                This example uses Three.js built-in materials and geometries:
              </p>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {`<mesh>
  <sphereGeometry args={[1, 32, 32]} />
  <meshStandardMaterial color="orange" />
</mesh>`}
              </pre>
            </div>
          )}
          {activeTab === "gradient" && (
            <div>
              <p className="mb-2">
                This example uses a custom shader to create a gradient based on
                surface normals:
              </p>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {`// Fragment shader
const fragmentShader = \`
  varying vec3 vNormal;
  
  void main() {
    // Create a gradient based on the normal vector
    vec3 normal = normalize(vNormal);
    
    // Map normal coordinates to RGB color space
    vec3 color = 0.5 + 0.5 * normal;
    
    gl_FragColor = vec4(color, 1.0);
  }
\`;`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
