import Image from "next/image";
import { PokemonDetail } from "@/types/PokemonDetails";
import { useState } from "react";

type PokemonDetailsProps = {
  pokemon: PokemonDetail;
  onDeselect: () => void;
};

const PokemonDetails = ({ pokemon, onDeselect }: PokemonDetailsProps) => (
  <div className="flex items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-purple-500 flex flex-col w-full max-w-md">
      <div className="flex justify-between items-center pt-4 pl-4 pr-4">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {pokemon.name}
        </h2>
        <button
          onClick={onDeselect}
          className="text-purple-500 hover:bg-gray-100 p-3 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          aria-label="Cerrar"
        >
          X
        </button>
      </div>
      <div className="relative h-3/4 w-full pl-4">
        <Image
          src={
            pokemon.imgUrl ??
            "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
          }
          alt={`Imagen de ${pokemon.name}`}
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 capitalize">
          Detalles
        </h2>
        <p className="text-gray-800">
          <span className="font-bold">Altura:</span> {pokemon.height} cm
        </p>
        <p className="text-gray-800">
          <span className="font-bold">Peso:</span> {pokemon.weight} kg
        </p>

        <div className="mt-4 border-t pt-2">
          <h3 className="text-lg font-bold text-gray-800">Tipos</h3>
          <div className="flex space-x-2 mt-2">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="inline-block bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PokemonDetails;
