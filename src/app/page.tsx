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
import { Title } from "@/components/Title";
import "animate.css";
import PokemonAlphabetCountTable from "@/components/PokemonAlphabetCountTable";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

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

  const handlePokemonSelection = (pokemonDetail: PokemonDetail) => {
    setSelectedPokemon(pokemonDetail);
    if (window.innerWidth < 950) setIsSmallScreen(true);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setIsSmallScreen(false);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <main className="flex min-h-screen flex-col p-4">
      <Title />

      {!isSmallScreen && (
        <>
          <PokemonCount
            text={searchTerm ? "Pokémon encontrados" : "Total de Pokémon"}
            count={totalPokemons}
          />
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
        </>
      )}

      <div
        className={`flex flex-1 ${
          !isSmallScreen ? "min-w-0" : "items-center justify-center"
        } mt-4`}
      >
        {!isSmallScreen && (
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 flex flex-col ${
                selectedPokemon && "lg:block"
              } ${isSmallScreen && "hidden"}`}
            >
              <PokemonTable
                pokemons={displayedPokemons}
                initNumber={offset}
                onPokemonSelect={handlePokemonSelection}
                isPokemonDisplayed={selectedPokemon ? true : false}
              />
              <PaginationControls
                page={page}
                totalPages={totalPages}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
              />
            </div>
          </div>
        )}

        {selectedPokemon && (
          <div
            className={`w-full lg:w-auto max-w-md lg:flex-none animate__animated animate__fadeInDown  ${
              isSmallScreen ? "flex justify-center" : ""
            }`}
          >
            <PokemonDetails
              pokemon={selectedPokemon}
              onDeselect={handleCloseModal}
            />
          </div>
        )}    
      </div>

      <PokemonAlphabetCountTable pokemons={pokemons} />
    </main>
  );
};

export default HomePage;
