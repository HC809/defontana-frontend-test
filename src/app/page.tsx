"use client";
import React, { useCallback, useEffect, useState } from "react";
import PokemonTable from "@/components/PokemonTable";
import { LIMIT } from "@/constants/pokeapi.constants";
import usePokemons from "@/hooks/usePokemon";
import { PokemonDetail } from "@/types/PokemonDetails";
import PokemonDetails from "@/components/PokemonDetails";
import SearchInput from "@/components/SearchInput";
import PokemonCount from "@/components/PokemonCount";
import PaginationControls from "@/components/PaginationControls";
import usePagination from "@/hooks/usePagination";
import { Pokemon } from "@/types/Pokemon";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);

  //Custom Hooks
  const { pokemons, loading } = usePokemons();
  const { page, offset, totalPages, goToNextPage, goToPrevPage } =
    usePagination(totalPokemons, searchTerm);

  useEffect(() => {
    let filteredPokemons = pokemons;

    if (searchTerm) {
      filteredPokemons = pokemons
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, LIMIT);
      setTotalPokemons(filteredPokemons.length);
      setSuggestions(
        filteredPokemons.slice(0, 5).map((pokemon) => pokemon.name)
      );
    } else {
      setTotalPokemons(pokemons.length);
      setSuggestions([]);
    }

    setDisplayedPokemons(filteredPokemons.slice(offset, offset + LIMIT));
  }, [searchTerm, pokemons, offset]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setShowSuggestions(true);
  }, []);

  const handlePokemonSelection = (pokemonDetail: PokemonDetail) =>
    setSelectedPokemon(pokemonDetail);

  if (loading) return <div>Cargando...</div>;

  return (
    <main className="flex min-h-screen flex-col p-10">
      <SearchInput
        value={searchTerm}
        onChange={handleSearch}
        pokemonSuggestions={showSuggestions ? suggestions : []}
        onPokemonSuggestionClick={(value) => {
          setSearchTerm(value);
          setSuggestions([]);
          setShowSuggestions(false);
        }}
      />
      <PokemonCount count={totalPokemons} />

      <div className="flex flex-1 min-w-0 mt-4">
        <div className="flex-1 flex flex-col">
          <PokemonTable
            pokemons={displayedPokemons}
            initNumber={offset}
            onPokemonSelect={handlePokemonSelection}
          />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
        </div>

        {selectedPokemon && (
          <div className="w-full max-w-md flex-none">
            <PokemonDetails
              pokemon={selectedPokemon}
              onDeselect={() => setSelectedPokemon(null)}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
