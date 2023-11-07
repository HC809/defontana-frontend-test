import React from "react";

type PokemonCountProps = {
  text: string;
  count: number;
};

const PokemonCount = React.memo(({ text, count }: PokemonCountProps) => (
  <div className="mb-2 font-semibold">
    <span>{text}: </span>
    <span className="text-purple-600">{count}</span>
  </div>
));

export default PokemonCount;
