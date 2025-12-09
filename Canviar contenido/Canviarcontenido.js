//canviar contenido
let titulo = document.getElementById("titulo");
titulo.textContent = "Título actualizado";

document.getElementById("paragrafo").textContent = "Texto actualizado desde JS"

let mascota = document.getElementById("mascota");
mascota.src="20240726_194627.jpg";

for(let i=0;i<5;i++){
let newArticle = document.createElement("article");
newArticle.innerHTML="<h3>Título del artículo</h3><p>Parrafo del artículo</p>";

document.getElementById("main").appendChild(newArticle);
}
// document.body.appendChild(newArticle);

//añadir div
