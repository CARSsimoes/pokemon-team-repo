import getAllMovesAndAttacksOfPokemonSelected from "./MovesAndStats";
import {
    buttonSelectAttacks, selectAttacksDiv, selectTeam
} from "./PokemonList";
  
  const pokemonSelected = document.getElementsByClassName("card selected");
  const buttonStatsSection = document.getElementById("goToStatsSection");
  const errorMessage = document.getElementsByClassName("message-attacks-error");
  
  const goToSelectAttacks = () => {
    //Store all information of pokemon selectd at Local Storage
    //make request to select all information of pokemon selected
    //moves array, stats array, image sprites["front_default"]
    //create new file to create all "database" information
    //it will allow us not only selected 4 attacks but also to maintain 4 attacks selected
    //when we change in pokemons list!
  
    //Fetching data of pokemon selected and store it at local storage
    const listOfPokemonSelected = Array.from(pokemonSelected).map(
      (pokemon) => pokemon.classList[0]
    );
    console.log(listOfPokemonSelected);
    getAllMovesAndAttacksOfPokemonSelected(listOfPokemonSelected);
  
    //Supported by most of the browsers set the value that you want with scrollTop propertie
    //after select 6 pokemon we want that scroll go to the top of the screen
    document.documentElement.scrollTop = 0;
  
    //Change between different sections
    selectTeam.style.display = "none";
    selectAttacksDiv.style.display = "block";
  
    //Container for team selected
    const containerPokemons = document.createElement("div");
    containerPokemons.setAttribute("class", "container-pokemons");
  
    //Container for attacks list of each pokemon selected
    const containerAttacks = document.createElement("div");
    containerAttacks.setAttribute("class", "container-attacks");
  
    const containerNode = document.getElementById("container");
    containerNode.appendChild(containerPokemons);
    containerNode.appendChild(containerAttacks);
  
    //Create slider with 6 pokemon selected
    const teamSelected = Array.from(pokemonSelected)
      .map(
        (poke, index) =>
          `<div class="${poke.classList[0]} pokemons-team ${index}">
            <div class="${index} card-team">
              <img class="slider-image" src="${poke.childNodes[1].src}" alt="${poke.classList[0]}">
              <h3 class="slider-name">${poke.classList[0]}</h3>
            </div>
          </div>`
      )
      .join("");
  
    containerPokemons.innerHTML = teamSelected;
  
    displayAllAttacks();
  };
  
  //Click go button -> Start Attacks List Part
  buttonSelectAttacks.addEventListener("click", goToSelectAttacks);
  
  //Load all event listeners
  const displayAllAttacks = () => {
    //Select a pokemon and display his attacks
    selectAttacksDiv.addEventListener("click", selectPokemon);
  };
  
  const selectPokemon = (event) => {
    const cardSelected = document.getElementsByClassName("card-team selected");
    //target different from card -> nothig to do
    if (
      event.target.classList.contains("card-team") ||
      event.target.classList.contains("slider-image") ||
      event.target.classList.contains("slider-name")
    ) {
      //if a pokemon is selected the selection must be removed to select a new one
      //TODO: if already selected -> nothig to do
      if (cardSelected.length > 0) {
        //store attacks selected -> if exist
        if (document.getElementsByClassName("pokemon-move selected").length > 0) {
          storeAttacksSelected(cardSelected);
        }
        cardSelected[0].classList.remove("selected");
      }
  
      if (event.target.classList.contains("card-team")) {
        if (event.target.parentElement.classList.contains("selected")) {
          event.target.classList.remove("selected");
        } else {
          event.target.classList += " selected";
        }
      }
      if (
        event.target.classList.contains("slider-image") ||
        event.target.classList.contains("slider-name")
      ) {
        if (event.target.parentElement.classList.contains("selected")) {
          event.target.parentElement.classList.remove("selected");
        } else {
          event.target.parentElement.classList += " selected";
        }
      }
      displayAttacksOfPokeSelected();
    }
  };
  
  const displayAttacksOfPokeSelected = () => {
    const attacksContainer = document.getElementsByClassName("container-attacks");
  
    //Show to the user the list of attacks of the pokemon selected
    attacksList(attacksContainer);
  
    attacksContainer[0].addEventListener("click", selectAttacks);
  };
  
  const selectAttacks = (event) => {
    const attacksSelected = document.getElementsByClassName(
      "pokemon-move selected"
    );
  
    const numbertOfAttacksSelectedAllowed = attacksSelected.length < 4;
    if (event.target.localName === "button") {
      if (event.target.classList.contains("selected")) {
        event.target.classList.remove("selected");
      } else {
        if (numbertOfAttacksSelectedAllowed) {
          event.target.classList += " selected";
        }
      }
    }
  };
  
  const attacksList = (attacksContainer) => {
    const pokemonSelected = document.querySelector(".card-team.selected")
      .parentElement.classList[2];
    const pokemonSelectedData = JSON.parse(localStorage.getItem(pokemonSelected));
    const buttonOfEachMove = pokemonSelectedData
      .map((move) => `<button class="${move} pokemon-move">${move}</button>`)
      .join("");
    attacksContainer[0].innerHTML = buttonOfEachMove;
  
    //check if there is already some attack selected
    //confirm that each pokemon have 4 attacks selected
    checkIfAllAttacksAreSelected();
    const nameOfMovesSelected = JSON.parse(
      localStorage.getItem(parseInt(pokemonSelected) + 12)
    );
    let classSelected = "";
    if (nameOfMovesSelected !== null) {
      nameOfMovesSelected.map((name) => {
        classSelected = `${name}` + " pokemon-move";
        document.getElementsByClassName(classSelected)[0].classList +=
          " selected";
      });
    }
  };
  
  const storeAttacksSelected = (pokemonSelected) => {
    const index = parseInt(pokemonSelected[0].classList[0]);
    const movesSelected = document.getElementsByClassName(
      "pokemon-move selected"
    );
    const eachMove = Array.from(movesSelected).map((move) => move.innerText);
    localStorage.setItem(index + 12, JSON.stringify(eachMove));
  
    checkIfAllAttacksAreSelected();
  };
  
  const checkIfAllAttacksAreSelected = () => {
    //each list of attacks will be stored at localStorage from key 12 -> 17
    const pokemonHas4AttacksSelected =
      JSON.parse(localStorage.getItem(12))?.length === 4 &&
      JSON.parse(localStorage.getItem(13))?.length === 4 &&
      JSON.parse(localStorage.getItem(14))?.length === 4 &&
      JSON.parse(localStorage.getItem(15))?.length === 4 &&
      JSON.parse(localStorage.getItem(16))?.length === 4 &&
      JSON.parse(localStorage.getItem(17))?.length === 4;
    if (pokemonHas4AttacksSelected) {
      buttonStatsSection.disabled = false;
      //Remove error message
      errorMessage[0].classList += " hide";
    } else {
      buttonStatsSection.disabled = true;
      if (errorMessage[0].classList.contains("hide")) {
        errorMessage[0].classList.remove("hide");
      }
    }
  };
  //Create event listener for button go to Final Stats
  //1 - after user enter in Attacks section and select a pokemon the button will be available
  //2 - First validation, if user click button, see if each pokemon has 4 attacks
  //3 - if each pokemon don't have 4 attacks selected the user can not continue
  // 3.1 - ISSUE: select an attack then unselect it, change pokemon! it will remain selected -.-
  // 3.2 - Ditto only have 1 attack so it must be create an exception for him
  // 3.2.1 - if there is one pokemon with only one attack selected confirm if it is ditto
  
  //####ISSUEafter last attack being selected, the button must become available!!!!
  
  export { buttonStatsSection };
