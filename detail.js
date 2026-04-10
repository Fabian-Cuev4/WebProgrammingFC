const detailStatus = document.getElementById("detailStatus");
const detailCard = document.getElementById("detailCard");
const detailImage = document.getElementById("detailImage");
const detailName = document.getElementById("detailName");
const detailBaseInfo = document.getElementById("detailBaseInfo");
const detailTypes = document.getElementById("detailTypes");
const detailAbilities = document.getElementById("detailAbilities");
const detailStats = document.getElementById("detailStats");
const backBtn = document.getElementById("backBtn");

async function loadPokemonDetail() {
  const pokemonName = localStorage.getItem("selectedPokemon");

  if (!pokemonName) {
    detailStatus.textContent = "No hay un Pokémon seleccionado";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Error al cargar el Pokémon");
    }

    const data = await response.json();

    const types = data.types.map(item => item.type.name).join(", ");
    const abilities = data.abilities.map(item => item.ability.name).join(", ");
    const stats = data.stats
      .map(item => `${item.stat.name}: ${item.base_stat}`)
      .join(" | ");

    detailImage.src = data.sprites.front_default;
    detailImage.alt = data.name;
    detailName.textContent = data.name.toUpperCase();
    detailBaseInfo.textContent = `ID: ${data.id} | Altura: ${data.height} | Peso: ${data.weight}`;
    detailTypes.textContent = `Tipos: ${types}`;
    detailAbilities.textContent = `Habilidades: ${abilities}`;
    detailStats.textContent = `Estadísticas: ${stats}`;

    detailCard.classList.remove("hidden");
    detailStatus.textContent = "";
  } catch (error) {
    detailStatus.textContent = "No se pudo cargar la información del Pokémon";
  }
}

backBtn.addEventListener("click", function () {
  window.location.href = "app.html";
});

loadPokemonDetail();