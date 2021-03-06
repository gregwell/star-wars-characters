import { useState, useEffect, useCallback } from "react";
import { Character } from "../types/types";
import axios from "axios";
import { CharacterResponse } from "../types/types";
import { SUCCESS, PENDING, ERROR, IDLE } from "../constants/status";

const useCharacters = (pageNumber: number) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >(IDLE);
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const execute = useCallback(async () => {
    setStatus(PENDING);
    setError(null);
    try {
      const result = await axios.request<CharacterResponse>({
        url: "https://swapi.dev/api/people",
        method: "get",
        params: {
          page: pageNumber,
        },
      });
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...result.data.results,
      ]);
      setStatus(SUCCESS);
      const next = typeof result.data.next;
      if (next === "string") {
        setHasMore(true);
      }
      if (next === "object") {
        setHasMore(false);
      }
    } catch (error) {
      setError(error);
      setStatus(ERROR);
    }
  }, [pageNumber]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { status, characters, error, hasMore };
};

export default useCharacters;
