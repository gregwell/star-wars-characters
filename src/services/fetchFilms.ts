import axios from "axios";
import { FilmResponse } from "../types/types";

export async function fetchFilms() {
  try {
    const result = await axios.request<FilmResponse>({
      url: "https://swapi.dev/api/films/",
      method: "get",
    });
    return result.data.results;
  } catch (error) {
    return error;
  }
}