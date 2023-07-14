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
  const hp = pokemon.stats[0].base_stat;
  const maxHp = hp * 2 + 204;
  const minHp = hp * 2 + 110;
  const avgHp = (maxHp + minHp) / 2;
  const attack = pokemon.stats[1].base_stat;
  const maxAttack = (attack * 2 + 99) * 1.1;
  const minAttack = (attack * 2 + 5) * 0.9;
  const defense = pokemon.stats[2].base_stat;
  const maxDefense = (defense * 2 + 99) * 1.1;
  const minDefense = (defense * 2 + 5) * 0.9;
  const speed = pokemon.stats[5].base_stat;
  const maxSpeed = (speed * 2 + 99) * 1.1;
  const minSpeed = (speed * 2 + 5) * 0.9;

  document.body.style.backgroundColor = color;
  let tab2 = document.getElementById("tab_2");
  tab2.innerHTML = `
  <div class="stats">
  <label for="hp">HP:</label>
<progress id="hp" value="${hp}" max="${minHp}"> ${hp} </progress>
<label for="attack">Attack:</label>
<progress id="attack" value="${attack}" max="${minAttack}"> ${attack} </progress>
<label for="defense">Defense:</label>
<progress id="defense" value="${defense}" max="${minDefense}"> ${defense} </progress>
<label for="speed">Speed:</label>
<progress id="speed" value="${speed}" max="${minSpeed}"> ${speed} </progress>
</div>



  `;
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
  <div class="listWrapper">
  <p class="listItem"> " ${overview1} ${overview2} ${overview3} "</p>
  </div>
        

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
