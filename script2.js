const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
console.log(id);
const colors = {
  fire: "#FF4433",
  grass: "#50C878",
  electric: "#F4C430",
  water: "#4169E1",
  ground: "#967969",
  rock: "#71797E",
  fairy: "#FFB6C1",
  poison: "#d23988",
  bug: "#FF7F50",
  dragon: "#FFAA33",
  psychic: "#DA70D6",
  flying: "#A7C7E7",
  fighting: "#FF3131",
  normal: "#EDEADE",
};

const fetchPokemonDetails = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  displayPokemonDetails(data);
};

const displayPokemonDetails = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = pokemon.types[0].type.name;
  const color = colors[type];
  document.body.style.backgroundColor = color;

  let pokemonDetailsEl = document.getElementById("pokemon-details");
  pokemonDetailsEl.innerHTML = `
        <div class="image">
        <img src="${imageSrc}" alt="${name}">
        </div>
      `;
};

fetchPokemonDetails();
