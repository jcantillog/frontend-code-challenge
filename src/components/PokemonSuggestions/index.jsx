import React from "react";

const PokemonSuggestions = ({ searchValue = "", suggestions = [] }) => {
  return (
    <ul className="suggestions">
      {suggestions.length
        ? suggestions.map(pokemon => (
            <li key={`${pokemon.Number}`}>
              <img src={pokemon.img} alt={pokemon.Number} />
              <div className="info">
                {getHighlightedPokemonName({ name: pokemon.Name })}
                {pokemon.Types.map((type, index) => (
                  <span
                    key={`${index} ${type}`}
                    className={`type ${type.toLowerCase()}`}
                  >
                    {type}
                  </span>
                ))}
                <br />
                <br />
                <span className={`type`}>CP: {pokemon.MaxCP}</span>
              </div>
            </li>
          ))
        : searchValue && (
            <li>
              <img
                src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
                alt=""
              />
              <div className="info">
                <h1 className="no-results">No results</h1>
              </div>
            </li>
          )}
    </ul>
  );

  function getHighlightedPokemonName({ name }) {
    const splittedName = name.split(new RegExp(`(${searchValue})`, "gi"));

    return (
      <h1>
        {splittedName.map((letter, i) => (
          <span
            key={i}
            className={
              letter.toLowerCase() === searchValue.toLowerCase() ? "hl" : ""
            }
          >
            {letter}
          </span>
        ))}
      </h1>
    );
  }
};

export default PokemonSuggestions;
