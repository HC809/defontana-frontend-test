import { Pokemon } from "@/types/Pokemon";
import React, { useState } from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  pokemonSuggestions: string[];
  onPokemonSuggestionClick: (name: string) => void;
};

const SearchInput = React.memo(
  ({
    value,
    onChange,
    pokemonSuggestions,
    onPokemonSuggestionClick,
  }: SearchInputProps) => {
    return (
      <div className="relative mb-4">
        {" "}
        {/* Contenedor con posición relativa */}
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 border rounded w-full" // Asegúrate de que el input tenga un ancho definido
        />
        {pokemonSuggestions.length > 0 && (
          <ul className="list-none mt-1 absolute z-10 w-full bg-white border rounded shadow-lg">
            {" "}
            {/* Menú de sugerencias con posición absoluta */}
            {pokemonSuggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => {
                  onPokemonSuggestionClick(suggestion);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default SearchInput;
