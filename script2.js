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
  const url3 = `https://pokeapi.co/api/v2/type/${id}`; //changing the api so that the query is pokemon specific
  const res = await fetch(url);
  const res2 = await fetch(url2);
  const res3 = await fetch(url3);
  const data = await res.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const arr = [data, data2, data3];
  console.log(arr);
  displayPokemonDetails(arr);
};

const displayPokemonDetails = async (pokemon) => {
  const name = pokemon[0].name[0].toUpperCase() + pokemon[0].name.slice(1);
  const japaneseName = pokemon[1].names[0].name;
  const id = pokemon[0].id.toString().padStart(3, "0");
  const imageSrc = pokemon[0].sprites.other.dream_world.front_default;
  const imageSrc2 = pokemon[0].sprites.other["official-artwork"].front_default;
  const poke_types = pokemon[0].types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  const color = colors[type];

  const hp = pokemon[0].stats[0].base_stat;
  // const maxHp = hp * 2 + 204;
  // const minHp = hp * 2 + 110;
  const attack = pokemon[0].stats[1].base_stat;
  // const maxAttack = Math.floor((attack * 2 + 99) * 1.1);
  // const minAttack = Math.floor((attack * 2 + 5) * 0.9);
  const spAttack = Math.floor(pokemon[0].stats[3].base_stat);
  // const maxSpAttack = Math.floor((spAttack * 2 + 99) * 1.1);
  // const minSpAttack = Math.floor((spAttack * 2 + 5) * 0.9);
  const spDefense = Math.floor(pokemon[0].stats[4].base_stat);
  // const maxSpDefense = Math.floor((spDefense * 2 + 99) * 1.1);
  // const minSpDefense = Math.floor((spDefense * 2 + 5) * 0.9);
  const defense = pokemon[0].stats[2].base_stat;
  // const maxDefense = Math.floor((defense * 2 + 99) * 1.1);
  // const minDefense = Math.floor((defense * 2 + 5) * 0.9);
  const speed = pokemon[0].stats[5].base_stat;
  // const maxSpeed = Math.floor((speed * 2 + 99) * 1.1);
  // const minSpeed = Math.floor((speed * 2 + 5) * 0.9);

  const abilities = pokemon[0].abilities.map((ability) => ability.ability.name);
  const eggGroups = pokemon[1].egg_groups.map((group) => group.name);
  // const moves = pokemon[0].moves.map((move) => move.move.name);
  document.body.style.backgroundColor = color;
  const evolutionChainUrl = pokemon[1].evolution_chain.url;
  const resEvolutionChain = await fetch(evolutionChainUrl);
  const evolutionChainData = await resEvolutionChain.json();
  console.log(evolutionChainData);

  const varieties = pokemon[1].varieties
    .map((variety) => {
      if (variety.is_default === true) {
        return null; // or return undefined;
      }
      return variety.pokemon;
    })
    .filter((item) => item !== null); // Remove null items from the array
  console.log(varieties);
  const resVarieties = await Promise.all(
    varieties.map((variety) => fetch(variety.url))
  );
  const varietiesData = await Promise.all(
    resVarieties.map((res) => res.json())
  );
  console.log(varietiesData);

  let tab3 = document.getElementById("tab_3");
  tab3.innerHTML = `
  <div class="evolution">
  </div>
  <div class="varieties">
  </div>
  `;

  const displayVarieties = (varietiesData) => {
    const container = document.querySelector(".varieties");
    container.innerHTML = "";

    varietiesData.forEach((variety) => {
      const pokemonName = variety.name;
      const imgUrl = variety.sprites.other["official-artwork"].front_default;

      const pokemonDiv = document.createElement("div");
      pokemonDiv.classList.add("varieties__pokemon");

      const nameElement = document.createElement("h1");
      nameElement.textContent = pokemonName;
      pokemonDiv.appendChild(nameElement);

      const imageElement = document.createElement("img");
      imageElement.src = imgUrl;
      pokemonDiv.appendChild(imageElement);

      container.appendChild(pokemonDiv);
    });
  };

  displayVarieties(varietiesData);
  const displayEvolutionChain = (evolutionChainData) => {
    const container = document.querySelector(".evolution");
    container.innerHTML = "";

    const chain = evolutionChainData.chain;
    displayEvolutionRecursive(chain, container);
  };

  const displayEvolutionRecursive = (chain, container) => {
    const pokemonName = chain.species.name;
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdFromURL(
      chain.species.url
    )}.png`;

    const EvolutionId = getPokemonIdFromURL(chain.species.url);

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("evolution__pokemon");
    const iconDiv = document.createElement("div");

    const nameElement = document.createElement("h1");
    nameElement.textContent = pokemonName;
    pokemonDiv.appendChild(nameElement);

    const imageElement = document.createElement("img");
    imageElement.src = imgUrl;
    pokemonDiv.appendChild(imageElement);
    imageElement.addEventListener("click", () => {
      window.location.href = `details.html?id=${EvolutionId}}`;
    });

    if (chain.evolves_to.length > 0) {
      const arrowIndicator = document.createElement("i");
      arrowIndicator.classList.add(
        "fa-solid",
        "fa-caret-right",
        "fa-2x",
        "fa-beat"
      );
      iconDiv.appendChild(arrowIndicator);
    }

    container.appendChild(pokemonDiv);
    container.appendChild(iconDiv);

    if (chain.evolves_to.length > 0) {
      const evolutionData = chain.evolves_to[0];
      displayEvolutionRecursive(evolutionData, container);
    }
  };
  function getPokemonIdFromURL(url) {
    const parts = url.split("/");
    return parts[parts.length - 2];
  }
  displayEvolutionChain(evolutionChainData);
  let weakTypes=[...pokemon[2].damage_relations.no_damage_to.map((type)=>{
      return `<img src="./Icons/${type.name}.svg" alt="test images" class="${type.name} poke_type_bg"></img>`
  })]
  var weakTypesString='';
  for(let i in weakTypes){
    weakTypesString=weakTypesString+weakTypes[i];

  }
  let strongTypes=[...pokemon[2].damage_relations.double_damage_to.map((type)=>{
  return `<img src="./Icons/${type.name}.svg" alt="test images" class="${type.name} poke_type_bg"></img>`
})]
var strongTypesString='';
for(let i in strongTypes){
  strongTypesString=strongTypesString+strongTypes[i];

}

  let tab2 = document.getElementById("tab_2");
  tab2.innerHTML = `
  <div class="stats">
  <div class="stat">
  <div>
  <span> Health:</span>
  <span>${hp}</span>
  </div>
    <meter id="hp"
    style="content: 'HP';"
       min="0" max="255"
       low="70" high="120" optimum="150"
       value="${hp}">
  </meter>
  </div>


    <div class="stat">
    <div>
  <span> Attack:</span>
  <span>${attack}</span>
  </div>
    <meter id="attack"
        min="0" max="255"
        low="70" high="120" optimum="150"
        value="${attack}">
  </meter>
  </div>



    <div class="stat">
    <div>
  <span> Defense:</span>
  <span>${defense}</span>
  </div>
    <meter id="defense"
        min="0" max="255"
        low="70" high="120" optimum="150"
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
        low="70" high="120" optimum="150"
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
        low="70" high="120" optimum="150"
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
        low="70" high="120" optimum="150"
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
        low="500" high="720" optimum="1000"
        value="${speed + hp + attack + defense + spAttack + spDefense}">
  </meter>
  </div>
    <div class="statTypes">
      <div class="statTypeText">
        <div>
          Weak Against
        </div>
        
      </div>
      
        <div class="statIconHolder">
          ${weakTypesString==""?'None':weakTypesString}
          
       </div> 
    </div>
    <div class="statTypes">
      <div class="statTypeText">
        <span>
          Strong Against
        </span>
      </div>
    
      <div class="statIconHolder">
       ${strongTypesString==""?'None':strongTypesString}
     </div>
    </div>
  `;
  let pokemonDetailsEl = document.getElementById("pokemon-details");
  pokemonDetailsEl.innerHTML = `
        <div class="btn">
        <button class="previousBtn" onclick="backButton()"><i class="fas fa-chevron-left"></i></button>
        <button class="nextBtn" onclick="nextPokemon()"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="names">
        <div class="japaneseName">${japaneseName}</div>
        <div class="name">${name}</div>
        
        </div>
        <div class="top">
        <div class="image">
        <img class="imgFront" src="${
          imageSrc == null ? imageSrc2 : imageSrc
        }" alt="${name}">
        <img class="imgBack" src="./Icons/default/pokeball.svg" alt="pokeball">
        </div>

        </div>

      `;

  const desiredLanguage = "en";
  let overview = "Sorry, no description available.";
  let genus = "Sorry, no description available.";

  for (const entry of pokemon[1].flavor_text_entries) {
    if (entry.language.name === desiredLanguage) {
      // Replace "\f" with a space in the flavor text
      overview = entry.flavor_text.replace("\f", " ");
      break; // Stop the loop once we find the English flavor text
    }
  }
  for (const entry of pokemon[1].genera) {
    if (entry.language.name === desiredLanguage) {
      genus = entry.genus;
      break;
    }
  }

  const height = pokemon[0].height / 10 + "m";
  const weight = pokemon[0].weight / 10 + "kg";

  const genderRate = pokemon[1].gender_rate;
  let male = "";
  let female = "";
  if (genderRate === -1) {
    male = "??";
    female = "??";
  } else if (genderRate === 0) {
    male = "100%";
    female = "0%";
  } else if (genderRate === 8) {
    male = "0%";
    female = "100%";
  } else {
    female = (genderRate / 8) * 100 + "%";
    male = 100 - (genderRate / 8) * 100 + "%";
  }
  const friendship = pokemon[1].base_happiness;
  const catchRate = pokemon[1].capture_rate;

  let tab1 = document.getElementById("tab_1");
  tab1.innerHTML = `
  <div>
  <div class="overview">
  <p><span class="genus">${genus}</span><br>${overview}</p>
  <div class="heightWeight">
  <span>Height:<br><b>${height}</b></span>
  <span>Weight:<br><b>${weight}</b></span>
  </div>

  <div class="types">
  ${poke_types
    .map(
      (type) => `
    <div class="poke__type__bg ${type}">
      <img src="Icons/${type}.svg" alt="Type">
    </div>
  `
    )
    .join("")}
  </div>
  </div>

  <div class="about">
  <div>Id: <b class="id">#${id}</b></div>
  <div>Gender: <b><i class="fa-solid fa-mars" style="color: #1f71ff;"></i>${male}  <i class="fa-solid fa-venus" style="color: #ff5c74;"></i>${female}</b></div>
  <span>Abilities: <b>${abilities.join(", ")}</b></span>
  <span>Catch Rate: <b>${catchRate} (${((catchRate / 255) * 100).toFixed(
    2
  )}% chance)</b></span>
  <span>Base Friendship: <b>${friendship} (${
    friendship < 50 ? "lower" : friendship < 100 ? "normal" : "higher"
  })</b></span>
  <span>Base Exp: <b>${pokemon[0].base_experience}</b></span>
  <span>Growth Rate: <b>${pokemon[1].growth_rate.name}</b></span>
  <span>Egg Groups: <b>${eggGroups.join(", ")}</b></span>

  </div>
        

`;
};

const tabs = document.querySelectorAll("[data-tab-value]");
const tabsContainer = document.querySelector(".tabs");
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
const nextPokemon = (e) => {
  window.location.href = `details.html?id=${id + 1}`;
  e.preventDefault();
};
const backButton = (e) => {
  window.history.back();
  e.preventDefault();
};

fetchPokemonDetails();

//preloader
window.addEventListener("load", function () {
  document.querySelector("body").classList.add("loaded");
});
