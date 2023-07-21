const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
console.log(id);
const colors = {
  fire: "#e03a3a",
  grass: "#50C878",
  electric: "#fad343",
  water: "#1E90FF",
  ground: "#735139",
  rock: "#63594f",
  fairy: "#EE99AC",
  poison: "#b34fb3",
  bug: "#A8B820",
  dragon: "#fc883a",
  psychic: "#882eff",
  flying: "#87CEEB",
  fighting: "#bf5858",
  normal: "#D2B48C",
  ghost: "#7B62A3",
  dark: "#414063",
  steel: "#808080",
  ice: "#98D8D8",
};
const main_types = Object.keys(colors);

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
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  const hp = pokemon.stats[0].base_stat;
  const maxHp = hp * 2 + 204;
  const minHp = hp * 2 + 110;
  const attack = pokemon.stats[1].base_stat;
  const maxAttack = Math.floor((attack * 2 + 99) * 1.1);
  const minAttack = Math.floor((attack * 2 + 5) * 0.9);
  const spAttack = Math.floor(pokemon.stats[3].base_stat);
  const maxSpAttack = Math.floor((spAttack * 2 + 99) * 1.1);
  const minSpAttack = Math.floor((spAttack * 2 + 5) * 0.9);
  const spDefense = Math.floor(pokemon.stats[4].base_stat);
  const maxSpDefense = Math.floor((spDefense * 2 + 99) * 1.1);
  const minSpDefense = Math.floor((spDefense * 2 + 5) * 0.9);
  const defense = pokemon.stats[2].base_stat;
  const maxDefense = Math.floor((defense * 2 + 99) * 1.1);
  const minDefense = Math.floor((defense * 2 + 5) * 0.9);
  const speed = pokemon.stats[5].base_stat;
  const maxSpeed = Math.floor((speed * 2 + 99) * 1.1);
  const minSpeed = Math.floor((speed * 2 + 5) * 0.9);

  const abilities = pokemon.abilities.map((ability) => ability.ability.name);
  const moves = pokemon.moves.map((move) => move.move.name);

  document.body.style.backgroundColor = color;

  let tab3 = document.getElementById("tab_3");
  tab3.innerHTML = `
  <div class="abilities">
  <h1>Abilities</h1>
  <div class="ability">
  ${abilities.map((ability) => `<div>${ability}</div>`).join("")}
  </div>
  </div>
  <br>
  <h1>Moves</h1>
  <div class="moves">
  ${moves.map((move) => `<div class="move">${move}</div>`).join("")}
  </div>
  
  `;

  let tab2 = document.getElementById("tab_2");
  tab2.innerHTML = `
  <div class="stats">
  <hr>
  <div class="stat">
  <div> Health:</div>
    <meter id="hp"
    style="content: 'HP';"
       min="0" max="255"
       low="80" high="150" optimum="200"
       value="${hp}">
  </meter>
  </div>
  <hr>

    <div class="stat">
  <div> Attack:</div>

    <meter id="attack"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${attack}">
  </meter>
  </div>
  <hr>


    <div class="stat">
  <div> Defense:</div>
    <meter id="defense"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${defense}">
  </meter>


  </div>
<hr>


      <div class="stat">
  <div> Sp. Atk:</div>
    <meter id="spattack"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${spAttack}">
  </meter>


  </div>
<hr>

      <div class="stat">
  <div> Sp. Def:</div>
    <meter id="spdefense"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${spDefense}">
  </meter>


  </div>
<hr>


    <div class="stat">
  <div> Speed:</div>
    <meter id="speed"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${speed}">
  </meter>
  </div>
  <hr>
  </div>



  `;
  let pokemonDetailsEl = document.getElementById("pokemon-details");
  pokemonDetailsEl.innerHTML = `
        <div class="top">
        <div class="image">
        <img src="${imageSrc}" alt="${name}">
        <div class="circle"></div>
        </div>
        <span class="id">#${id}</span>
        <div class="name">${name}</div>
        <div class="poke__type__bg ${type}">
        <img src="Icons/${type}.svg" alt="Type"></div>
        </div>
        </div>
        </div>

      `;
};
const displayPokemonSpecies = (pokemon) => {
  const overview1 = pokemon.flavor_text_entries[7].flavor_text.replace(
    "\f",
    " "
  );
  let tab1 = document.getElementById("tab_1");
  tab1.innerHTML = `
  <div class="listWrapper">
  <p class="listItem"> ${overview1}</p>
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
    target.scrollIntoView({ behavior: "smooth" });
  });
});

fetchPokemonDetails();
fetchPokemonSpecies();
