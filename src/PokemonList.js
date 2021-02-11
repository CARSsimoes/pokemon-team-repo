import "./main.css";
import "./ModalComponent";
import { ModalComponent, type } from "./ModalComponent";

const pokedex = document.getElementById("pokedex");
const selectTeam = document.getElementById("selectTeam");
const selectAttacksDiv = document.getElementById("selectAttacks");
const buttonSelectAttacks = document.getElementById("goToSelectAttacksSection");

const loader =
  `<div class="center-on-page"><div class="pokeball">` +
  `<div class="pokeball__button"></div></div></div>`;

window.load = getReady();

function getReady() {
  //Loader
  pokedex.innerHTML = loader;

  //Fetching All pokemon of Kanto Region
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    promises.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name)
    }));
    //Show to the user the list of Pokemons
    displayPokemon(pokemon);
    //Load all event listeners
    loadEventListeners();
  });
}

//Load all event listeners
function loadEventListeners() {
  //Select pokemon and Unselect pokemon
  pokedex.addEventListener("click", selectPokemon);
}

const displayPokemon = (pokemon) => {
  const pokemonHTML = pokemon
    .map((pokemon) => {
      let card = `<div class="${pokemon.name} card">
          <img class="card-img-top" src="${pokemon.image}" alt="${pokemon.name}">
          <div class="card-body">
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <div class="card-body-types">`;

      const listOfTypes = pokemon.type.map(
        (type) => `<p class="card-text ${type}"> ${type} </p>`
      );
      card += listOfTypes.join(" ");

      card += `</div></div></div>`;
      return card;
    })
    .join("");
  pokedex.innerHTML = pokemonHTML;
};

const selectPokemon = (event) => {
  //if target different from card -> nothig to do
  //issue: without this validation the last pokemon could not be selected
  // and the button go could be available to be clicked!
  if (
    event.target.classList.contains("card") ||
    event.target.classList.contains("card-img-top") ||
    event.target.classList.contains("card-body") ||
    event.target.classList.contains("card-title") ||
    event.target.classList.contains("card-text")
  ) {
    const checkNumberOfPokemonSelected = document.getElementsByClassName(
      "selected"
    );

    let numberOfPokemon = checkNumberOfPokemonSelected.length;

    //Button Go must only be available if 6 pokemon are selected
    if (numberOfPokemon === 5) {
      buttonSelectAttacks.disabled = false;
    } else {
      buttonSelectAttacks.disabled = true;
    }

    //Trainer can only take 6 pokemons to the league
    //But if a pokemon is selected in error later the trainer can change the selection, even if 6 pokemon are selected
    if (numberOfPokemon < 6 || event.target.classList.contains("selected")) {
      if (event.target.classList.contains("card")) {
        if (event.target.classList.contains("selected")) {
          event.target.classList.remove("selected");
        } else {
          event.target.classList += " selected";
        }
      }
      if (
        event.target.classList.contains("card-img-top") ||
        event.target.classList.contains("card-body")
      ) {
        if (event.target.parentElement.classList.contains("selected")) {
          event.target.parentElement.classList.remove("selected");
        } else {
          event.target.parentElement.classList += " selected";
        }
      }
      if (
        event.target.classList.contains("card-title") ||
        event.target.classList.contains("card-text")
      ) {
        if (
          event.target.parentElement.parentElement.classList.contains(
            "selected"
          )
        ) {
          event.target.parentElement.parentElement.classList.remove("selected");
        } else {
          event.target.parentElement.parentElement.classList += " selected";
        }
      }
    } else {
      //WARNING Modal
      //Modal to say to the user that already has selected 6
      // If user want to select another pokemon, first it must unselect one that he already has selected
      const modalDiv = document.getElementById("modalDiv");
      modalDiv.style.display = "block";

      createErrorModal(modalDiv, type.ERROR, "You can only select 6 pokemon!");

      buttonSelectAttacks.disabled = false;
    }
  }
};

const createErrorModal = (modalDiv, type, message) => {
  const modalError = new ModalComponent(type, message);

  modalDiv.innerHTML = modalError.render();

  const closeButton = document.querySelector("#closeBtn");

  //Listen for close click and click outside of Modal
  closeButton.addEventListener("click", closeModal);
  modalDiv.addEventListener("click", outsideClick);

  //Function to open modal
  function closeModal() {
    modalDiv.style.display = "none";
  }

  //Function to close modal if outside click
  function outsideClick(event) {
    if (event.target === modalDiv) {
      modalDiv.style.display = "none";
    }
  }
};

export { selectTeam, selectAttacksDiv, buttonSelectAttacks };
