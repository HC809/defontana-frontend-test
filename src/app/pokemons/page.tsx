"use client";
import React, { useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";
import PokemonTable from "@/components/PokemonTable";
import { pokemonApiRequest } from "@/api/apiConfig";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";

interface PageProps {
  initialPokemons: Pokemon[];
}

const PokemonsPage: NextPage<PageProps> = ({ initialPokemons }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons || []);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemons = async (newOffset: number) => {
    try {
      const data: PokemonApiResponse = await pokemonApiRequest.get(
        newOffset,
        limit
      );
      setPokemons(data.results);
      setOffset(newOffset);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (offset !== 0) fetchPokemons(offset);
  }, [offset, limit]);

  const goToNextPage = () => {
    setPage(page + 1);
    setOffset(offset + limit);
  };

  const goToPrevPage = () => {
    setPage(Math.max(1, page - 1));
    setOffset(Math.max(0, offset - limit));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="mb-2 text-sm"
      >
        {[10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} items per page
          </option>
        ))}
      </select>

      <PokemonTable pokemons={pokemons} />

      <div className="py-2">
        {offset > 0 && (
          <button
            onClick={goToPrevPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
        )}
        <button
          onClick={goToNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const offset = 0;
  const limit = 10;
  try {
    const data: PokemonApiResponse = await pokemonApiRequest.get(offset, limit);
    return { props: { initialPokemons: data.results } };
  } catch (error) {
    return { props: { initialPokemons: [] } };
  }
};

export default PokemonsPage;
