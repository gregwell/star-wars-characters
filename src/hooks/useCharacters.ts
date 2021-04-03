import { useState, useEffect, useCallback } from "react";
import { Character } from "../types/types";

const useCharacters = <T, E = string>(
  asyncFunction: (pageNumber: number) => Promise<T>,
  pageNumber: number
) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [error, setError] = useState<E | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const execute = useCallback(() => {
    setStatus("pending");
    setError(null);

    return asyncFunction(pageNumber)
      .then((response: any) => {
        if (response.length > 0) {
          setCharacters((prevCharacters) => [...prevCharacters, ...response]);
          setHasMore(true);
        } else {
          setHasMore(false);
        }

        setStatus("success");
      })
      .catch((error: any) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction, pageNumber]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { status, characters, error, hasMore };
};

export default useCharacters;