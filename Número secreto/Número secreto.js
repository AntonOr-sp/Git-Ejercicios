//Ejercicio número secreto
// Genera un número secreto entre 1 y 100
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let adivinado = false;

while (!adivinado) {
  let entrada = prompt("Adivina el número secreto (entre 1 y 100):");
  let numeroUsuario = Number(entrada);
  intentos++;

  if (numeroUsuario > numeroSecreto) {
    alert("El número secreto es menor.");
  } else if (numeroUsuario < numeroSecreto) {
    alert("El número secreto es mayor.");
  } else if (numeroUsuario === numeroSecreto) {
    alert("¡Correcto! Has acertado el número.");
    adivinado = true;
  } else {
    alert("Por favor, introduce un número válido.");
  }
}

alert(`Lo lograste en ${intentos} intentos.`);