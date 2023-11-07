export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  imgUrl: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
