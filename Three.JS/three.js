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

// 3. EL CILINDRO
const radiusTop = 0.5;
const radiusBottom = 0.5;
const height = 1.5;
const radialSegments = 32;
const cylGeo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
const materialCyl = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.5,
    metalness: 0.5
});
const cylinder = new THREE.Mesh(cylGeo, materialCyl);
cylinder.position.x = 0; // Lo movemos al lado opuesto del dodecaedro

cylinder.scale.set(2, 2, 2); // MODIFICAR CILINDRO LÍNEA

scene.add(cylinder);

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