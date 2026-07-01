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
/* funcion de filtrar personajes */
function fitrarPersonajes(texto) {
  const filtrados = Personajes.filter((f) =>
    f.name.toLowerCase().includes(texto.toLowerCase()),
  );
  limpiarResultados();
  if (filtrados.length === 0) {
    contenedor.innerHTML = "<p> no se encontraron personajes</p>";
    return;
  }
  renderizarPersonajes(filtrados);
}
buscar.addEventListener("click", () => {
  const texto = document.querySelector("#buscar").value.trim();
  if (texto === "") {
    alert("debe ingresar un nombre");
    return;
  }
  fitrarPersonajes(texto);
});
/* funcion de detalle */
async function cargarDetalles(id) {
  const respuesta = await fetch(
    `https://thesimpsonsapi.com/api/characters/${id}`,
  );
  const personaje = await respuesta.json();
  mostrarModal(personaje);
}

contenedor.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btnDetalles")) {
    const id = e.target.dataset.id;
    cargarDetalles(id);
  }
});
// modal de detalle
function mostrarModal(p) {
  document.querySelector("#modal_imagen").src =
    "https://cdn.thesimpsonsapi.com/500" + p.portrait_path;
  document.querySelector("#modal_nombre").textContent = p.name;
  document.querySelector("#modal_nacimiento").textContent =
    "Fecha de nacimiento: " + p.birthdate;
  document.querySelector("#modal_edad").textContent = "edad: " + p.age;
  document.querySelector("#modal_genero").textContent = "genero: " + p.gender;
  document.querySelector("#modal_ocupacion").textContent =
    "ocupacion: " + p.occupation;
  document.querySelector("#modal_estado").textContent = "estado: " + p.status;
  document.querySelector("#modal_frase").textContent =
    "Frase iconica: " + p.phrases[0];
  const modal = new bootstrap.Modal(document.getElementById("modal_personaje"));
  modal.show();
}
