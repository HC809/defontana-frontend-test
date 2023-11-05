import Image from "next/image";
import { PokemonDetail } from "@/types/PokemonDetails";

type PokemonDetailsProps = {
  pokemon: PokemonDetail;
  onDeselect: () => void;
};

const PokemonDetails = ({ pokemon, onDeselect }: PokemonDetailsProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-purple-500 h-full flex flex-col w-full max-w-md flex-none ml-4">
      <div className="flex justify-between items-center p-4">
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
      <div className="relative h-3/4 w-full pl-16">
        <Image
          src={pokemon.imgUrl}
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
          <span className="ml-2">Height: {pokemon.height / 10} m</span>
        </div>
        <div className="flex-1 inline-flex items-center">
          <span className="ml-2">Weight: {pokemon.weight / 10} kg</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
