// components/ThreeJSVisualization.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeJSVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let animationFrameId: number;
    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight || 400; // Default height if not set by container

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.background.setAlpha(0);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    // Renderer setup with antialias and proper pixel ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // Create geometry with better performance
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Handle window resize
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight || 400;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with performance optimization
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Only rotate and render if the element is visible
      const rect = currentMount.getBoundingClientRect();
      if (
        rect.bottom >= 0 &&
        rect.top <= window.innerHeight
      ) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[400px] bg-transparent"
      style={{ touchAction: 'none' }} // Prevent unwanted touch behaviors
    />
  );
};

export default ThreeJSVisualization;
