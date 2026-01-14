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
// Vamos a crear diversos objetos con materiales que reaccionen a la luz
// 1. EL CUBO
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshStandardMaterial({
    color: 0x00b0ff,
    roughness: 0.9,
    metalness: 0.9
});
const cube = new THREE.Mesh(boxGeo, materialCube);

cube.position.x = 4;

// Esta es la línea que modifica el tamaño:
cube.scale.set(2, 2, 2); 

scene.add(cube);

// 2. LA ESFERA
const sphereRad = 0.9; // Ajustado de 6.9 a 1.2 para que se vea bien con el cubo
const wSegments = 30;
const hSegments = 30;

const sphereGeo = new THREE.SphereGeometry(
    sphereRad, 
    wSegments, 
    hSegments
);

const materialSphere = new THREE.MeshStandardMaterial({
    color: 0x9e9e9e,
    roughness: 0.2,
    metalness: 0.5
});

const sphereMesh = new THREE.Mesh(sphereGeo, materialSphere);

// La movemos en el eje Z o Y para que no tape al cubo
// sphereMesh.position.set(0, 0, -3); 
sphereMesh.position.x = 0;
sphereMesh.position.y = 2.4;
scene.add(sphereMesh);

// 1. GEOMETRÍA COMÚN (la misma para todos)
const cylGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);

// --- CILINDRO 1 (Rojo - Original) ---
const materialCyl1 = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.5,
    metalness: 0.5
});
const cylinder1 = new THREE.Mesh(cylGeo, materialCyl1);
cylinder1.position.x = 0;
cylinder1.scale.set(2, 2, 2);
scene.add(cylinder1);

// --- CILINDRO 2 (Verde - Nuevo) ---
const materialCyl2 = new THREE.MeshStandardMaterial({
    color: 0x00b0ff, // Color verde
    roughness: 0.2,  // Más brillante
    metalness: 0.8   // Más metálico
});
const cylinder2 = new THREE.Mesh(cylGeo, materialCyl2);
cylinder2.position.x = 1.4; // Desplazado a la derecha
cylinder2.position.y = 0.35;
cylinder2.scale.set(0.75, 1.5, 0.75);
scene.add(cylinder2);

// --- CILINDRO 3 (Amarillo - Nuevo) ---
const materialCyl3 = new THREE.MeshStandardMaterial({
    color: 0x00b0ff, // Color amarillo
    roughness: 0.2,  // Más opaco/mate
    metalness: 0.8
});
const cylinder3 = new THREE.Mesh(cylGeo, materialCyl3);
cylinder3.position.x = -1.4; // Desplazado a la izquierda
cylinder3.position.y = 0.35;
cylinder3.scale.set(0.75, 1.5, 0.75);
scene.add(cylinder3);

// --- CILINDRO 4 (Verde - Nuevo) ---
const materialCyl4 = new THREE.MeshStandardMaterial({
    color: 0x00b0ff, // Color verde
    roughness: 0.2,  // Más brillante
    metalness: 0.8   // Más metálico
});
const cylinder4 = new THREE.Mesh(cylGeo, materialCyl2);
cylinder4.position.x = 0.7; // Desplazado a la derecha
cylinder4.position.y = -2.65;
cylinder4.scale.set(0.75, 1.5, 0.75);
scene.add(cylinder4);

// --- CILINDRO 5 (Verde - Nuevo) ---
const materialCyl5 = new THREE.MeshStandardMaterial({
    color: 0x00b0ff, // Color verde
    roughness: 0.2,  // Más brillante
    metalness: 0.8   // Más metálico
});
const cylinder5 = new THREE.Mesh(cylGeo, materialCyl2);
cylinder5.position.x = -0.7; // Desplazado a la derecha
cylinder5.position.y = -2.65;
cylinder5.scale.set(0.75, 1.5, 0.75);
scene.add(cylinder5);

// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)

// --- E. ANIMACIÓN (Game Loop) ---
function animate() {
    requestAnimationFrame(animate);

    // Pequeña rotación automática
    /* cube.rotation.y += 0.005;
    cube.rotation.x += 0.002; */

    /* cylinder.rotation.y += 0.005;;
    cylinder.rotation.x += 0.005; */

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