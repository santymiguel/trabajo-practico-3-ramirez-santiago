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
