import { Pokemon } from "@/types/Pokemon";

type Props = {
  pokemons: Pokemon[];
};

type AlphabetCount = {
  [letter: string]: number;
};

const PokemonAlphabetCountTable = ({ pokemons }: Props) => {
  const alphabetCounts = pokemons.reduce<AlphabetCount>((acc, pokemon) => {
    const firstLetter = pokemon.name[0].toUpperCase();
    acc[firstLetter] = (acc[firstLetter] || 0) + 1;
    return acc;
  }, {});

  const sortedLetters = Object.keys(alphabetCounts).sort();

  return (
    <div className="overflow-hidden rounded-lg shadow-md mt-4">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Letra
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Pokemons
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedLetters.map((letter) => (
            <tr key={letter}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {letter}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alphabetCounts[letter]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonAlphabetCountTable;
