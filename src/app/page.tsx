"use client";
import React, { useEffect, useState } from "react";
import PokemonTable from "@/components/PokemonTable";
import { LIMIT } from "@/constants/pokeapi.constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import usePokemons from "@/hooks/usePokemon";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { pokemons, loading } = usePokemons();

  useEffect(() => {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPokemons(filteredPokemons.length);
    setOffset(0);
    setPage(1);
  }, [searchTerm, pokemons]);

  const displayedPokemons = searchTerm
    ? pokemons
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, LIMIT)
    : pokemons.slice(offset, offset + LIMIT);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setOffset(0);
    setPage(1);
  };

  const goToNextPage = () => {
    setPage((currentPage) => currentPage + 1);
    setOffset((currentOffset) => currentOffset + LIMIT);
  };

  const goToPrevPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
    setOffset((currentOffset) => Math.max(0, currentOffset - LIMIT));
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <main className="flex min-h-screen flex-col p-10">
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <div className="mb-4  font-semibold">
        <span>Total de Pokémons: </span>
        <span className="text-purple-600">{totalPokemons}</span>
      </div>

      <PokemonTable pokemons={displayedPokemons} initNumber={offset} />

      <div className="flex items-center justify-between py-2">
        <div className="flex justify-start w-24">
          {page > 1 && (
            <button
              onClick={goToPrevPage}
              className="flex items-center justify-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />{" "}
              <span className="hidden sm:inline">Anterior</span>
            </button>
          )}
        </div>
        <span className="flex-grow text-center mx-4">
          <span className="hidden sm:block">
            Página: {page} de {Math.ceil(totalPokemons / LIMIT)}
          </span>
          <span className="sm:hidden">
            Pág {page}/{Math.ceil(totalPokemons / LIMIT)}
          </span>
        </span>
        <div className="flex justify-end w-24">
          {offset + LIMIT < totalPokemons && (
            <button
              onClick={goToNextPage}
              className="flex items-center justify-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
