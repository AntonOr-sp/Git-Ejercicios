import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9e9e9e);

// CÁMARA
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5); // Posición angular para apreciar mejor el 3D

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio); // Mejor nitidez en pantallas Retina/4K
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLES (Definidos antes de la animación)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// CARGAR MODELO IMPORTADO
const loader = new GLTFLoader();
loader.load(
  'Maqueta tren.glb', 
  (gltf) => {
    scene.add(gltf.scene);
    console.log('Modelo cargado con éxito');
    
    // Opcional: Centrar la cámara en el modelo automáticamente
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    controls.target.copy(center);
    controls.update();
  },
  undefined,
  (error) => console.error('Error cargando GLB:', error)
);

// LOOP DE ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);
  
  controls.update(); // REQUERIDO para enableDamping: true
  renderer.render(scene, camera);
}
animate();

// AJUSTE DE VENTANA
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

