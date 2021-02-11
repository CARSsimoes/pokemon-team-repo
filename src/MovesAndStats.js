function getAllMovesAndAttacksOfPokemonSelected(pokemonSelected) {
    //Store All information necessary of pokemon selected
    //Later it will be already stored at local storage and we don't to fetch again
    localStorage.clear();
    const promises = [];
    const sizePokemons = pokemonSelected.length;
    for (let i = 0; i < sizePokemons; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonSelected[i]}`;
  
      promises.push(fetch(url).then((response) => response.json()));
    }
  
    Promise.all(promises).then((results) => {
      const pokemonMoves = results.map((data) => ({
        move: data.moves.map((move) => move.move.name)
      }));
  
      pokemonMoves.map((poke, index) =>
        localStorage.setItem(index, JSON.stringify(poke.move))
      );
  
      const pokemonStat = results.map((data) => ({
        stat: data.stats.map((stat) => stat.base_stat)
      }));
  
      pokemonStat.map((poke, index) =>
        localStorage.setItem(index + 6, JSON.stringify(poke.stat))
      );
    });
  }
  
  export default getAllMovesAndAttacksOfPokemonSelected;
  
  // get item
  //JSON.parse(localStorage.getItem('bulbasaur'))
  
  //get moves
  // JSON.parse(localStorage.getItem('bulbasaur')).move
