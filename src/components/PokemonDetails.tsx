import Image from "next/image";
import { PokemonDetail } from "@/types/PokemonDetails";

const PokemonDetails = ({ pokemon }: { pokemon: PokemonDetail }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
      <div className="relative h-64 w-64 flex items-center justify-center">
        {" "}
        <Image
          src={pokemon.imgUrl}
          alt={`Imagen de ${pokemon.name}`}
          layout="responsive"
          width={100}
          height={100}
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 capitalize">
          {pokemon.name}
        </h2>
        <p className="text-gray-700">
          <span className="font-bold">ID:</span> {pokemon.id}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Height:</span> {pokemon.height} cm
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Weight:</span> {pokemon.weight} kg
        </p>
      </div>
      <div className="flex p-4 border-t border-gray-200 text-gray-700">
        <div className="flex-1 inline-flex items-center">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3v18h18"></path>
            <path d="M18.5 3h-13l6.5 9 6.5-9"></path>
          </svg>
          <span className="ml-2">Height: {pokemon.height / 10} m</span>
        </div>
        <div className="flex-1 inline-flex items-center">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3v18h18"></path>
            <path d="M18.5 3h-13l6.5 9 6.5-9"></path>
          </svg>
          <span className="ml-2">Weight: {pokemon.weight / 10} kg</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
