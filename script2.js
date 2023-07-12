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
  console.log(data);
  displayPokemonDetails(data);
};
const fetchPokemonSpecies = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayPokemonSpecies(data);
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
        <div class="top">
        <img src="${imageSrc}" alt="${name}">
        <span class="id">#${id}</span>
        <div class="name">${name}</div>
        <div class="type">Type: ${type}</div>
        </div>


      `;
};
const displayPokemonSpecies = (pokemon) => {
  const overview1 = pokemon.flavor_text_entries[0].flavor_text.replace(
    "\f",
    " "
  );
  const overview2 = pokemon.flavor_text_entries[2].flavor_text.replace(
    "\f",
    " "
  );
  const overview3 = pokemon.flavor_text_entries[4].flavor_text.replace(
    "\f",
    " "
  );
  let tab1 = document.getElementById("tab_1");
  tab1.innerHTML = `
  <ul class="listWrapper">
  <li class="listItem">${overview1}</li>
  <li class="listItem">${overview2}</li>
  <li class="listItem">${overview3}</li>
  </ul>
        

`;
};

const tabs = document.querySelectorAll("[data-tab-value]");
const tabInfos = document.querySelectorAll("[data-tab-info]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabValue);

    tabInfos.forEach((tabInfo) => {
      tabInfo.classList.remove("active");
    });
    target.classList.add("active");
  });
});

fetchPokemonDetails();
fetchPokemonSpecies();
