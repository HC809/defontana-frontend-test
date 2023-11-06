import React, { useEffect, useRef, useState } from "react";

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
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative mb-4" ref={ref}>
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="p-2 border rounded w-full"
        />
        {isFocused && pokemonSuggestions.length > 0 && (
          <ul className="list-none mt-1 absolute z-10 w-full bg-white border rounded shadow-lg">
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
