//Cojo el div del teclado, para luego ir añadiendo
let teclado = document.getElementById("teclado");

for (let i = 65; i <= 90; i++) {
    //Creo la tecla
    let tecla = document.createElement("div");
    tecla.innerHTML = "<p>" + String.fromCharCode(i) + "</p>";
    tecla.className = "tecla";

    tecla.setAttribute('onclick', "escribeTecla('" + String.fromCharCode(i) + "')");

    //Añado la tecla al teclado
    teclado.appendChild(tecla);
}

let palabra = "";
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0]; // La API devuelve un array, ej: ["perro"]
            //Pasamos la palabra a mayúsculas
            palabra = palabra.toUpperCase();
            console.log("Tu palabra secreta es:", palabra);

        });
}

function escribeTecla(letra) {
    console.log(letra);
    let miTexto = document.getElementById("miTexto");
    console.log("En mi texto hay: " + miTexto.textContent)
    if (miTexto.textContent.length < 5) {
        // miTexto.style.backgroundColor = "blueviolet"
        miTexto.textContent += letra
        console.log("En mi texto he añadido " + letra + "y ahora hay: " + miTexto.textContent)
    }
    else {
        miTexto.style.backgroundColor = "red"
        console.log("Demasiado largo")
    }
}

function borrarLetra() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.length > 0) {
        miTexto = miTexto.textContent.substring(0, miTexto.textContent.length - 1);
    }
}

function comprobar() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent == palabra) {
        miTexto.backgroundColor = "green";
        alert("you win perfect!")
    }
    else
        alert("you lost JIJIJIJA")
}