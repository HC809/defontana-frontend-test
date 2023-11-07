import React, { useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { EyeIcon } from "@heroicons/react/24/outline";
import { pokemonApiRequest } from "@/api/apiConfig";
import { PokemonDetailApiResponse } from "@/types/PokemonDetailApiResponse";
import { PokemonDetail, PokemonType } from "@/types/PokemonDetails";
import BarLoader from "react-spinners/BarLoader";

interface PokemonTableProps {
  pokemons: Pokemon[];
  initNumber: number;
  onPokemonSelect: (pokemonName: PokemonDetail) => void;
  isPokemonDisplayed: boolean;
}

const PokemonTable = ({
  pokemons,
  initNumber,
  onPokemonSelect,
  isPokemonDisplayed,
}: PokemonTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const fetchPokemon = async (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setLoading(true);
    try {
      const {
        id,
        name,
        sprites,
        height,
        weight,
        types,
      }: PokemonDetailApiResponse = await pokemonApiRequest.getByName(
        pokemonName
      );

      const pokemonTypes: PokemonType[] = types?.map((typeSlot) => ({
        slot: typeSlot.slot,
        type: {
          name: typeSlot.type.name,
          url: typeSlot.type.url,
        },
      }));

      const pokemonDetail: PokemonDetail = {
        name,
        id,
        weight,
        height,
        types: pokemonTypes,
        imgUrl: sprites.other.home.front_default,
      };

      onPokemonSelect(pokemonDetail);
    } catch (error) {
      alert(`Error al obtener el Pokemon ${pokemonName}`);
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
                  <tr key={pokemon.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {initNumber + index + 1}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-left capitalize ${
                        isPokemonDisplayed && selectedPokemon === pokemon.name
                          ? "text-purple-600 font-bold"
                          : "text-gray-900"
                      }`}
                    >
                      {pokemon.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handlePokemonSelection(pokemon.name)}
                          className={`text-purple-600 hover:text-indigo-900 flex items-center ${
                            loading ||
                            (isPokemonDisplayed &&
                              selectedPokemon === pokemon.name)
                              ? "disabled:opacity-50 text-gray-600"
                              : "cursor-pointer"
                          }`}
                          disabled={
                            loading ||
                            (isPokemonDisplayed &&
                              selectedPokemon === pokemon.name)
                          }
                        >
                          {loading && selectedPokemon === pokemon.name ? (
                            <BarLoader
                              loading={loading}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <>
                              <EyeIcon className="h-6 w-6" aria-hidden="true" />
                              <span className="hidden sm:inline ml-2">
                                Seleccionar
                              </span>
                            </>
                          )}
                        </button>
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
