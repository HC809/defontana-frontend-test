import React, { useEffect, useRef, useState } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
      if (ref.current && !ref.current.contains(event.target as Node))
        setIsFocused(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsFocused(false);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      if (!isFocused) setIsFocused(true);
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={ref}>
        <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
          <div className="pl-3">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar Pokémon"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            className="p-2 w-full rounded-lg focus:outline-none"
          />
          <button type="submit" className="p-2">
            <MagnifyingGlassIcon className="w-5 h-5 text-purple-500" />
          </button>
        </div>
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
