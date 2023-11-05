import React from "react";

type PokemonCountProps = {
  count: number;
};

const PokemonCount = React.memo(({ count }: PokemonCountProps) => (
  <div className="mb-4 font-semibold">
    <span>Total de Pokémons: </span>
    <span className="text-purple-600">{count}</span>
  </div>
));

export default PokemonCount;
