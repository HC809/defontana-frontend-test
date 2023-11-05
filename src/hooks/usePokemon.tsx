import { useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";
import { pokemonApiRequest } from "@/api/apiConfig";
import { FETCH_ALL } from "@/constants/pokeapi.constants";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPokemons = async () => {
      console.log("Entro a fetch");
      setLoading(true);
      try {
        const { results }: PokemonApiResponse = await pokemonApiRequest.getAll(
          FETCH_ALL
        );
        setPokemons(results);
      } catch (error) {
        if (isMounted) {
          setError("Failed to load pokemons");
          console.error(error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemons, loading, error };
};

export default usePokemons;
