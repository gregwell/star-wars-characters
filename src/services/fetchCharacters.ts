import axios from "axios";
import { CharacterResponse } from "../types/types";

export async function fetchCharacters(pageNumber: number) {
  try {
    const result = await axios.request<CharacterResponse>({
      url: "https://swapi.dev/api/people",
      method: "get",
      params: {
        page: pageNumber,
      },
    });
    return result.data.results;
  } catch (error) {
    return error;
  }
}

/*
    const result = await axios.request<CharacterResponse>({
      url: "https://swapi.dev/api/people",
      method: "get",
      params: {
        page: pageNumber,
      },
    });

*/
