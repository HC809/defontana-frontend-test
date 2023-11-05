import { AxiosResponse } from "axios";
import axiosRequest from "./axiosConfig";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";
import { PokemonDetailApiResponse } from "@/types/PokemonDetailApiResponse";

const responseBody = (response: AxiosResponse) => response.data;

const pokemonApiRequest = {
  getAll: (limit: number): Promise<PokemonApiResponse> =>
    axiosRequest.get(`?limit=${limit}`).then(responseBody),
  getByName: (name: string): Promise<PokemonDetailApiResponse> =>
    axiosRequest.get(`/${name}`).then(responseBody),
};

export { pokemonApiRequest };
