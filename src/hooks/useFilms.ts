import { useState, useEffect, useCallback } from "react";
import { fetchFilms } from "../services/fetchFilms";
import { Film } from "../types/types";

const useFilm = <E = string>(immediate = true) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [films, setFilms] = useState<Array<Film>>([]);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    setStatus("pending");
    setError(null);

    return fetchFilms()
      .then((response: any) => {
        setFilms(response);
        setStatus("success");
      })
      .catch((error: any) => {
        setError(error);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    if(immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { status, films, error, execute};
};

export default useFilm;
