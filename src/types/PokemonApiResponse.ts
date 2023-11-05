import { Pokemon } from "./Pokemon";

export type PokemonApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};
