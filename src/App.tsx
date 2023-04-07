import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './App.css'
import * as THREE from "three";

function App() {

  useEffect(() => {
    let canvas: HTMLCanvasElement;
    canvas = document.getElementById("canvas") as HTMLCanvasElement;

    // display sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // scene
    const scene: THREE.Scene = new THREE.Scene();

    // camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    scene.add(camera);

    const loader = new GLTFLoader();
    loader.load('/models/chiikawa.glb', (gltf) => {
      scene.add(gltf.scene);
    });

    // light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    //render
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent"></div>
    </>
  )
}

export default App;
