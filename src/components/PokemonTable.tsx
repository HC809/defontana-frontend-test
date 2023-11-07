import React, { useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { EyeIcon } from "@heroicons/react/24/outline";
import { pokemonApiRequest } from "@/api/apiConfig";
import { PokemonDetailApiResponse } from "@/types/PokemonDetailApiResponse";
import { PokemonDetail } from "@/types/PokemonDetails";

interface PokemonTableProps {
  pokemons: Pokemon[];
  initNumber: number;
  onPokemonSelect: (pokemonName: PokemonDetail) => void;
}

const PokemonTable = ({
  pokemons,
  initNumber,
  onPokemonSelect,
}: PokemonTableProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemon = async (pokemonName: string) => {
    setLoading(true);
    try {
      const { id, name, sprites, height, weight }: PokemonDetailApiResponse =
        await pokemonApiRequest.getByName(pokemonName);

      const pokemonDetail: PokemonDetail = {
        name,
        id,
        weight,
        height,
        imgUrl: sprites.other.home.front_default,
      };

      console.log(pokemonDetail);
      onPokemonSelect(pokemonDetail);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonSelection = async (name: string) => {
    await fetchPokemon(name);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    N°
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pokemon
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Seleccionar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pokemons.map((pokemon, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {initNumber + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left capitalize">
                      {pokemon.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center items-center">
                        <a
                          onClick={() => handlePokemonSelection(pokemon.name)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          <EyeIcon className="h-6 w-6" aria-hidden="true" />
                          <span className="hidden sm:inline ml-2">
                            Seleccionar
                          </span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonTable;
