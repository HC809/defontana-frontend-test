export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  //types: PokemonType[];
  //abilities: Ability[];
  //baseStats: BaseStats;
  //evolutions: Evolution[];
  imgUrl: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
}

interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface Evolution {
  speciesName: string;
  minLevel: number | null;
  triggerName: string;
  item: string | null;
}
