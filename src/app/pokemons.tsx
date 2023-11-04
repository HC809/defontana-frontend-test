import React, { useCallback, useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";
import PokemonTable from "@/components/PokemonTable";
import { pokemonApiRequest } from "@/api/apiConfig";
import { off } from "process";

const PokemonsPage = () => {
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalSearchingPokemons, setTotalSearchingPokemons] =
    useState<number>(0); //param para obtener total de Pokemons

  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0); //param para paginacion
  const [limit, setLimit] = useState<number>(10); //param para paginacion
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Efecto para la paginación cuando no se esta buscando
  useEffect(() => {
    if (!isSearching) {
      console.log("useEffect - getAllWithPagination");
      setLoading(true);
      pokemonApiRequest
        .getAllWithPagination(offset, limit)
        .then((data) => {
          setDisplayedPokemons(data.results);
          setTotalPokemons(data.count);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [offset, limit, isSearching]);

  // Manejo de la búsqueda
  useEffect(() => {
    // Filtrado y paginación para el modo de búsqueda
    if (isSearching) {
      if (searchTerm.trim() !== "") {
        console.log("useEffect - filteredPokemons");
        const filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTotalSearchingPokemons(filteredPokemons.length);
        setDisplayedPokemons(filteredPokemons.slice(offset, offset + limit));
      } else {
        console.log("useEffect - setAllPokemons");
        setTotalSearchingPokemons(totalPokemons);
        setDisplayedPokemons(allPokemons.slice(offset, offset + limit));
      }
    }
  }, [searchTerm, allPokemons, offset, limit, totalPokemons]);

  /*
  Función para obtener todos los Pokémon para la búsqueda
  Solo se una vez cuando se busca un Pokemon en el input,
  Para buscar coincidencias en todos los Pokemons existentes
  Y no solamente los que estan en la tabla (obtenidos por paginación)
  */
  const fetchAllPokemonsForSearch = async () => {
    console.log("fetchAllPokemonsForSearch");
    setLoading(true);
    try {
      const data: PokemonApiResponse = await pokemonApiRequest.getAll(
        totalPokemons
      );
      setAllPokemons(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    console.log("searchPokemon");
    if (!isSearching) {
      await fetchAllPokemonsForSearch();
      setIsSearching(true);
    }

    setOffset(0);
    setSearchTerm(value);
  };

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

  return (
    <>
      {/* <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="mb-2 text-sm"
      >
        {[10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} registros por pagina
          </option>
        ))}
      </select> */}
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <p>{!isSearching ? totalPokemons : totalSearchingPokemons}</p>
      <p>Page: {page}</p>
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
          (isSearching && offset + limit < totalSearchingPokemons)) && (
          <button
            onClick={goToNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default PokemonsPage;
