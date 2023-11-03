import { AxiosResponse } from "axios";
import axiosRequest from "./axiosConfig";
import { PokemonApiResponse } from "@/types/PokemonApiResponse";

const responseBody = (response: AxiosResponse) => response.data;

const pokemonApiRequest = {
  get: (offset: number, interval: number): Promise<PokemonApiResponse> =>
    axiosRequest.get(`?offset=${offset}&limit=${interval}`).then(responseBody),
};

export { pokemonApiRequest };
