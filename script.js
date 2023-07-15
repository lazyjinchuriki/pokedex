const poke_container = document.getElementById("poke-container");
const pokemon_count = 500;
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

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("card");
  pokemonEl.id = pokemon.id;

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  //    const moves = [];
  //    try {
  //     for (let i = 0; i <= 1 ; i++) {
  //             moves.push(pokemon.moves[i].move.name);
  //     }
  //     console.log(moves);
  //     } catch (error) {
  //         console.log(error);
  //     }

  let weight = pokemon.weight / 10 + "kg";
  let height = pokemon.height / 10 + "m";

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="front">
    <div class="front-image">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <big class="type">${type}</big>
    </div>
    </div>
    <div class="back">
    <div class="back-image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png" alt="${name}" />
    </div>
    <div class="info2">
        <span class="number">#${id}</span>
    </div>
    <div class="stats">
    <div> Weight:<br> ${weight}</div>
    <div> Height:<br> ${height}</div>
    </div>
    </div>
    `;

  // <div class="moves">
  // <div>${moves[0]}</div>
  // <div>${moves[1]}</div>
  // </div>

  pokemonEl.innerHTML = pokemonInnerHTML;
  // Add event listener to open new page on card click
  pokemonEl.addEventListener("click", () => {
    // Open new page with specific card details
    window.open(`details.html?id=${id}`, "_self");
  });

  poke_container.appendChild(pokemonEl);
};

fetchPokemons();

window.addEventListener("scroll", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

function search_pokemon() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  input = input.replace(/\s+/g, ""); // removing all spaces from search box
  // storing all card along wiith details in variable
  let x = document.getElementsByClassName("card");

  for (i = 0; i < x.length; i++) {
    // checking  the name or type entered by user from search box if doesn't match than dont display the message
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    }
    // checking  the name or type entered by user from search box if doesn't match than dont display the pokemon card
    else {
      x[i].style.display = "block";
    }
  }
}
