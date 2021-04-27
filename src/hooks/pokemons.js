import React, { useEffect, useState } from "react";
/* Services */
import { pokemonsService } from "../services";

export function usePokemons() {
  const [pokemonList, setPokemonList] = useState([]);
  const [maxCPPokemonList, setMaxCPPokemonList] = useState([]);
  const [loadingPokemons, setLoadingPokemons] = useState(false);
  const [pokemonSuggestionsList, setPokemonSuggestionsList] = useState([]);

  useEffect(() => {
    setLoadingPokemons(true);

    pokemonsService
      .getPokemons()
      .then(pokemons => {
        setLoadingPokemons(false);
        setPokemonList(pokemons);
        setMaxCPPokemonList(
          pokemons
            .slice()
            .sort((pokemonA, pokemonB) => pokemonB.MaxCP - pokemonA.MaxCP)
        );
      })
      .catch(error => {
        setLoadingPokemons(false);
        throw error;
      });
  }, []);

  function filterPokemons({
    filterValue = "",
    byName = true,
    byType = true,
    withMaxCP = false,
    maxResults = 4
  } = {}) {
    setLoadingPokemons(true);

    const executeValidationFor = ({ prop }) => {
      if (typeof prop === "string") {
        return prop.toLowerCase().includes(filterValue.toLowerCase());
      } else if (Array.isArray(prop)) {
        return prop.some(item =>
          item.toLowerCase().includes(filterValue.toLowerCase())
        );
      } else {
        return true;
      }
    };

    const sortSuggestedPokemons = (pokemonA, pokemonB) => {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      if (
        pokemonA.Name.toLowerCase().includes(lowerCaseFilterValue) &&
        !pokemonB.Name.toLowerCase().includes(lowerCaseFilterValue)
      )
        return -1;
      else if (
        !pokemonA.Name.toLowerCase().includes(lowerCaseFilterValue) &&
        pokemonB.Name.toLowerCase().includes(lowerCaseFilterValue)
      )
        return 1;
    };

    const suggestedPokemons = filterValue
      ? (withMaxCP ? maxCPPokemonList : pokemonList)
          .filter(pokemon =>
            byName && byType
              ? executeValidationFor({ prop: pokemon.Name }) ||
                executeValidationFor({ prop: pokemon.Types })
              : byName
              ? executeValidationFor({ prop: pokemon.Name })
              : byType
              ? executeValidationFor({ prop: pokemon.Types })
              : true
          )
          .sort(sortSuggestedPokemons)
          .slice(0, maxResults)
      : [];

    setLoadingPokemons(false);

    setPokemonSuggestionsList(suggestedPokemons);
  }

  return {
    loadingPokemons,
    filterPokemons,
    pokemonSuggestionsList
  };
}

export default { usePokemons };
