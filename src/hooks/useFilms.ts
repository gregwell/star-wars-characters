import { useState, useEffect, useCallback } from "react";
import { Film } from "../types/types";
import axios from "axios";
import { FilmResponse } from "../types/types";
import { SUCCESS, ERROR, PENDING, IDLE } from "../constants/status";

const useFilms = (immediate = true) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >(IDLE);
  const [films, setFilms] = useState<Array<Film>>([]);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setStatus(PENDING);
    setError(null);

    try {
      const result = await axios.request<FilmResponse>({
        url: "https://swapi.dev/api/films/",
        method: "get",
      });
      setFilms(result.data.results);
      setStatus(SUCCESS);
    } catch (error) {
      setError(error);
      setStatus(ERROR);
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { status, films, error, execute };
};

export default useFilms;
