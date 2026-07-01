let Personajes = [];
let contenedor = document.querySelector("#contenedor");
const buscar = document.querySelector("#btnBuscar");
/* funcion de carga de personajes*/
async function cargarPersonajes() {
  try {
    const respuesta = await fetch("https://thesimpsonsapi.com/api/characters");
    const datos = await respuesta.json();
    Personajes = datos.results;
  } catch {
    console.error("error al cargar el listado");
  }
}
/* funcion de limpiar resultados*/
function limpiarResultados() {
  contenedor.innerHTML = "";
}
/* funcion de renderizado */
function renderizarPersonajes(Lista = Personajes) {
  limpiarResultados();
  Lista.forEach((personaje) => {
    contenedor.innerHTML += `
    <div class="card bg-warning" style="width: 15rem;">
  <img src="https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}" class="card-img-top" alt="${personaje.name}">
  <div class="card-body">
    <h5 class="card-title">${personaje.name}</h5>
    <p class="card-text">ocupacion: ${personaje.occupation}</p>
    <button data-id = "${personaje.id}" class="btnDetalles btn btn-primary">ver detalles</button>
  </div>
</div>`;
  });
}
/* funcion de inicio*/
async function init() {
  await cargarPersonajes();
  renderizarPersonajes();
}
init();
