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

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );

  //Custom Hooks
  const { pokemons, loading } = usePokemons();
  const { page, offset, totalPages, goToNextPage, goToPrevPage } =
    usePagination(totalPokemons, searchTerm);

  useEffect(() => {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPokemons(filteredPokemons.length);
  }, [searchTerm, pokemons]);

  const displayedPokemons = searchTerm
    ? pokemons
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, LIMIT)
    : pokemons.slice(offset, offset + LIMIT);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handlePokemonSelection = (pokemonDetail: PokemonDetail) =>
    setSelectedPokemon(pokemonDetail);

  if (loading) return <div>Cargando...</div>;

  return (
    <main className="flex min-h-screen flex-col p-10">
      <SearchInput value={searchTerm} onChange={handleSearch} />
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
