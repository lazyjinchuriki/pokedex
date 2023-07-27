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
  const url2 = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const res = await fetch(url);
  const res2 = await fetch(url2);
  const data = await res.json();
  const data2 = await res2.json();
  const arr = [data, data2];
  console.log(arr);
  displayPokemonDetails(arr);
};

const displayPokemonDetails = (pokemon) => {
  const name = pokemon[0].name[0].toUpperCase() + pokemon[0].name.slice(1);
  const id = pokemon[0].id.toString().padStart(3, "0");
  const imageSrc = pokemon[0].sprites.other.dream_world.front_default;
  const imageSrc2 = pokemon[0].sprites.other["official-artwork"].front_default;
  const poke_types = pokemon[0].types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  const color = colors[type];

  const hp = pokemon[0].stats[0].base_stat;
  const maxHp = hp * 2 + 204;
  const minHp = hp * 2 + 110;
  const attack = pokemon[0].stats[1].base_stat;
  const maxAttack = Math.floor((attack * 2 + 99) * 1.1);
  const minAttack = Math.floor((attack * 2 + 5) * 0.9);
  const spAttack = Math.floor(pokemon[0].stats[3].base_stat);
  const maxSpAttack = Math.floor((spAttack * 2 + 99) * 1.1);
  const minSpAttack = Math.floor((spAttack * 2 + 5) * 0.9);
  const spDefense = Math.floor(pokemon[0].stats[4].base_stat);
  const maxSpDefense = Math.floor((spDefense * 2 + 99) * 1.1);
  const minSpDefense = Math.floor((spDefense * 2 + 5) * 0.9);
  const defense = pokemon[0].stats[2].base_stat;
  const maxDefense = Math.floor((defense * 2 + 99) * 1.1);
  const minDefense = Math.floor((defense * 2 + 5) * 0.9);
  const speed = pokemon[0].stats[5].base_stat;
  const maxSpeed = Math.floor((speed * 2 + 99) * 1.1);
  const minSpeed = Math.floor((speed * 2 + 5) * 0.9);

  const abilities = pokemon[0].abilities.map((ability) => ability.ability.name);
  const moves = pokemon[0].moves.map((move) => move.move.name);

  document.body.style.backgroundColor = color;

  let tab3 = document.getElementById("tab_3");
  tab3.innerHTML = `
  <div class="evolution">
  </div>

  `;

  let tab2 = document.getElementById("tab_2");
  tab2.innerHTML = `
  <div class="stats">
  <hr>
  <div class="stat">
  <div>
  <span> Health:</span>
  <span>${hp}</span>
  </div>
    <meter id="hp"
    style="content: 'HP';"
       min="0" max="255"
       low="80" high="150" optimum="200"
       value="${hp}">
  </meter>
  </div>


    <div class="stat">
    <div>
  <span> Atk:</span>
  <span>${attack}</span>
  </div>
    <meter id="attack"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${attack}">
  </meter>
  </div>



    <div class="stat">
    <div>
  <span> Def:</span>
  <span>${defense}</span>
  </div>
    <meter id="defense"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${defense}">
  </meter>
  </div>



      <div class="stat">
    <div>
  <span> Sp. Atk:</span>
  <span>${spAttack}</span>
  </div>
    <meter id="spattack"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${spAttack}">
  </meter>


  </div>


      <div class="stat">
    <div>
  <span> Sp. Def:</span>
  <span>${spDefense}</span>
  </div>
    <meter id="spdefense"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${spDefense}">
  </meter>
  </div>



    <div class="stat">
    <div>
  <span>Speed:</span>
  <span>${speed}</span>
  </div>
    <meter id="speed"
        min="0" max="255"
        low="80" high="150" optimum="200"
        value="${speed}">
  </meter>
  </div>


      <div class="stat">
      <div>
  <span> Total:</span>
  <span>${speed + hp + attack + defense + spAttack + spDefense}</span>
  </div>
    <meter id="total"
        min="0" max="1530"
        low="500" high="1000" optimum="1300"
        value="${speed + hp + attack + defense + spAttack + spDefense}">
  </meter>
  </div>


  `;
  let pokemonDetailsEl = document.getElementById("pokemon-details");
  pokemonDetailsEl.innerHTML = `
        <button class="previousBtn" onclick="backButton()"><i class="fas fa-chevron-left"></i></button>
        <button class="nextBtn" onclick="nextPokemon()"><i class="fas fa-chevron-right"></i></button>
        <div class="top">
        <div class="image">
        <img src="${imageSrc == null ? imageSrc2 : imageSrc}" alt="${name}">
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

  const overview1 = pokemon[1].flavor_text_entries[7].flavor_text.replace(
    "\f",
    " "
  );
  const height = pokemon[0].height / 10 + "m";
  const weight = pokemon[0].weight / 10 + "kg";

  let tab1 = document.getElementById("tab_1");
  tab1.innerHTML = `
  <div>
  <div class="overview">
  <p>${overview1}</p>
  <div class="about">
  <span>Height:<br><b>${height}</b></span>
  <span>Weight:<br><b>${weight}</b></span>
  </div>
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

const nextPokemon = () => {
  window.location.href = `details.html?id=${id + 1}`;
};
const backButton = () => {
  window.history.back();
};
fetchPokemonDetails();
