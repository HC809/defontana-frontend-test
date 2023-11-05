import { AxiosResponse } from "axios";
import axiosRequest from "./axiosConfig";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";

const responseBody = (response: AxiosResponse) => response.data;

const pokemonApiRequest = {
  getAll: (limit: number): Promise<PokemonApiResponse> =>
    axiosRequest.get(`?limit=${limit}`).then(responseBody),
};

export { pokemonApiRequest };
