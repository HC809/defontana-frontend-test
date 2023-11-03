import React, { useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";
import PokemonTable from "@/components/PokemonTable";
import { pokemonApiRequest } from "@/api/apiConfig";
import Image from "next/image";

const PokemonsPage = () => {
  const [paginationPokemons, setPaginationPokemons] = useState<Pokemon[]>([]); //Pokemons a mostrar mientras no se haya activado isSearching a true
  const [offset, setOffset] = useState<number>(0); //param para paginacion
  const [limit, setLimit] = useState<number>(10); //param para paginacion
  const [page, setPage] = useState<number>(1);

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPokemons, setTotalPokemons] = useState<number>(0); //param para obtener total de Pokemons
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]); //todos los Pokemons

  const [searchedPokemons, setSearchedPokemons] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Efecto para la paginación
  useEffect(() => {
    if (!isSearching) {
      setLoading(true);
      pokemonApiRequest
        .getAllWithPagination(offset, limit)
        .then((data) => {
          setPaginationPokemons(data.results);
          setTotalPokemons(data.count);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [offset, limit, isSearching]);

  /*
  Función para obtener todos los Pokémon para la búsqueda
  Solo se una vez cuando se busca un Pokemon en el input,
  Para buscar coincidencias en todos los Pokemons existentes
  Y no solamente los que estan en la tabla (obtenidos por paginación)
  */
  const fetchAllPokemonsForSearch = async () => {
    setLoading(true);
    try {
      const data = await pokemonApiRequest.getAll(totalPokemons);
      setAllPokemons(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Manejo de la búsqueda
  useEffect(() => {
    // Filtrado y paginación para el modo de búsqueda
    if (isSearching) {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPokemons(filteredPokemons.slice(offset, offset + limit));
    }
  }, [searchTerm, allPokemons, offset, limit]);

  // Filtrado condicional basado en si está buscando o no
  const displayedPokemons = isSearching ? searchedPokemons : paginationPokemons;

  const goToNextPage = () => {
    setPage((currentPage) => currentPage + 1);
    setOffset((currentOffset) => currentOffset + limit);
  };

  const goToPrevPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
    setOffset((currentOffset) => Math.max(0, currentOffset - limit));
  };

  if (loading) return <div>Cargando...</div>;

  console.log(offset);
  console.log(limit);
  console.log(totalPokemons);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="mb-2 text-sm"
      >
        {[10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} registros por pagina
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      |
      <PokemonTable pokemons={displayedPokemons} initNumber={offset} />
      <div className="py-2">
        {/* Botones de paginación, condicionales basados en la paginación del cliente o del servidor */}
        {page > 1 && (
          <button
            onClick={goToPrevPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
        )}
        {((!isSearching && offset + limit < totalPokemons) ||
          (isSearching && offset + limit < searchedPokemons.length)) && (
          <button
            onClick={goToNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
};

export default PokemonsPage;
