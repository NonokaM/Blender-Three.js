import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    let model: THREE.Group;
    const loader = new GLTFLoader();
    loader.load('/models/chiikawa.glb', (gltf) => {
      model = gltf.scene;
      scene.add(model);
    });

    let time = 0;
    const animate = () => {
      time += 0.001;
      if (model) {
        model.rotation.x += -0.001;
        model.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} className="canvas" />;
}

export default App;
