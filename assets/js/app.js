let Personajes = [];
async function cargarPersonajes() {
  const respuesta = await fetch("https://thesimpsonsapi.com/api/characters");
  const datos = await respuesta.json();
  Personajes = datos.results;
  console.log(Personajes);
}
