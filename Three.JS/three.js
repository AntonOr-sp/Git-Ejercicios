import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- A. CONFIGURACIÓN BÁSICA ---
//Escene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Color de fondo gris oscuro

//1. Camara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Movemos la cámara un poco atrás y arriba

//2. Rende
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Antialias para que se vea suave
renderer.setSize(window.innerWidth, window.innerHeight);
//añadimos este nuevo elemento al DOM
document.body.appendChild(renderer.domElement);

// --- B. LUCES  ---
// Luz ambiental (ILUMINA TODO SUAVEMENTE)
const ambientLight = new THREE.AmbientLight(0xffffff, 8);
scene.add(ambientLight);

// Luz direccional (COMO EL SOL)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// --- C. OBJETOS ---
// Vamos a crear un cubo pero con material que reaccione a la luz
// 1. EL CUBO
const boxGeo = new THREE.BoxGeometry; // Le puse tamaño para que se vea bien
const materialCube = new THREE.MeshStandardMaterial({
    color: 0x00b0ff,
    roughness: 0.9,
    metalness: 0.9
});

const cube = new THREE.Mesh(boxGeo, materialCube);
scene.add(cube);

// 2. EL DODECAEDRO
const materialDodecaedro = new THREE.MeshStandardMaterial({
    color: 0x04dd04, 
    roughness: 0.9,
    metalness: 0.9 
});

const radius = 1;
const detail = 2;
const dodecaGeo = new THREE.DodecahedronGeometry(radius, detail);

const dodecaMesh = new THREE.Mesh(dodecaGeo, materialDodecaedro);

// IMPORTANTE: Moverlo lo suficiente para que no se choque con el cubo
dodecaMesh.position.x = 3; 

scene.add(dodecaMesh);

// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)

// --- E. ANIMACIÓN (Game Loop) ---
function animate() {
    requestAnimationFrame(animate);

    // Pequeña rotación automática
    cube.rotation.y += 0.005;
    cube.rotation.x += 0.002;

    dodecaMesh.rotation.y += 0.005;
    dodecaMesh.rotation.x += 0.005;

    controls.update(); // Necesario por el damping
    renderer.render(scene, camera);
}

animate();

// Ajustar si cambian el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});