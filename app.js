const pokemonInput = document.getElementById("pokemonInput");
const searchBtn = document.getElementById("searchBtn");
const statusMessage = document.getElementById("statusMessage");

const pokemonCard = document.getElementById("pokemonCard");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonDescription = document.getElementById("pokemonDescription");
const moreInfoBtn = document.getElementById("moreInfoBtn");

let currentPokemonName = "";

async function searchPokemon() {
  const pokemon = pokemonInput.value.trim().toLowerCase();

  if (!pokemon) {
    statusMessage.textContent = "Ingresa el nombre de un Pokémon";
    pokemonCard.classList.add("hidden");
    moreInfoBtn.classList.add("hidden");
    return;
  }

  statusMessage.textContent = "Buscando...";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();

    currentPokemonName = data.name;

    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;
    pokemonName.textContent = data.name.toUpperCase();
    pokemonDescription.textContent = `Altura: ${data.height} | Peso: ${data.weight}`;

    pokemonCard.classList.remove("hidden");
    moreInfoBtn.classList.remove("hidden");
    statusMessage.textContent = "";
  } catch (error) {
    pokemonCard.classList.add("hidden");
    moreInfoBtn.classList.add("hidden");
    statusMessage.textContent = "No se encontró el Pokémon";
  }
}

searchBtn.addEventListener("click", searchPokemon);

pokemonInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchPokemon();
  }
});

moreInfoBtn.addEventListener("click", function () {
  if (!currentPokemonName) return;

  localStorage.setItem("selectedPokemon", currentPokemonName);
  window.location.href = "detail.html";
});