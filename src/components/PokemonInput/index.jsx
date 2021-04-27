import React, { useState } from "react";
/* Components */
import PokemonSuggestions from "../PokemonSuggestions";
import ToggleCombatPoints from "../ToggleCombatPoints";
/* Hooks */
import { usePokemons } from "../../hooks/pokemons";

const PokemonInput = ({}) => {
  const [inputValue, setInputValue] = useState("");
  const [withMaxCP, setWithMaxCP] = useState(false);
  const {
    pokemonSuggestionsList,
    loadingPokemons,
    filterPokemons
  } = usePokemons();

  return (
    <>
      <ToggleCombatPoints
        onCheck={event => {
          const checked = event.target.checked;
          setWithMaxCP(checked);
          filterPokemons({
            filterValue: inputValue,
            withMaxCP: checked
          });
        }}
      />
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onChange={handleInputChange}
      />
      {loadingPokemons && <div className="loader"></div>}
      <PokemonSuggestions
        searchValue={inputValue}
        suggestions={pokemonSuggestionsList}
      />
    </>
  );

  function handleInputChange(event) {
    const filterValue = event.target.value;
    setInputValue(filterValue);
    filterPokemons({ filterValue, withMaxCP });
  }
};

export default PokemonInput;
