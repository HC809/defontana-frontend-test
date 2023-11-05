import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = React.memo(({ value, onChange }: SearchInputProps) => (
  <input
    type="text"
    placeholder="Buscar Pokémon"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="mb-4 p-2 border rounded"
  />
));

export default SearchInput;
