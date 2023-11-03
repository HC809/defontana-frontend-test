import React, { useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";
import PokemonTable from "@/components/PokemonTable";
import { pokemonApiRequest } from "@/api/apiConfig";
import Image from "next/image";

const PokemonsPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const data: PokemonApiResponse = await pokemonApiRequest.get(
          offset,
          limit
        );
        setPokemons(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, [offset, limit]);

  const goToNextPage = () => {
    setPage(page + 1);
    setOffset(offset + limit);
  };

  const goToPrevPage = () => {
    setPage(Math.max(1, page - 1));
    setOffset(Math.max(0, offset - limit));
  };

  if (loading) return <div>Cargando...</div>;

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

export default PokemonsPage;
