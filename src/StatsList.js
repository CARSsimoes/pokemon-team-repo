import { buttonStatsSection } from "./AttacksList";
import { selectAttacksDiv } from "./PokemonList";
//import Chart from "chart.js";

const pokemonStatsDiv = document.getElementById("pokemonStats");

const goToStatsSection = () => {
  //Supported by most of the browsers set the value that you want with scrollTop propertie
  //after select 6 pokemon we want that scroll go to the top of the screen
  document.documentElement.scrollTop = 0;

  //Change between different sections
  selectAttacksDiv.style.display = "none";
  pokemonStatsDiv.style.display = "block";
};

//Click go button -> Start Attacks List Part
buttonStatsSection.addEventListener("click", goToStatsSection);

/*
const marksCanvas = document.getElementById("container-pokemons-chart");

let marksData = {
  labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
  datasets: [
    {
      label: "Student A",
      backgroundColor: "rgba(200,0,0,0.2)",
      data: [65, 75, 70, 80, 60, 80]
    }
  ]
};

let radarChart = new Chart(marksCanvas, {
  type: "radar",
  data: marksData
});

marksCanvas.innerHTML = radarChart;*/
