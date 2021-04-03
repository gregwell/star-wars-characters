import { useState, useEffect, useCallback } from "react";
import { Character } from "../types/types";

const useAsync = <T, E = string>(
  asyncFunction: (pageNumber: number) => Promise<T>,
  pageNumber: number
) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    setStatus("pending");
    setError(null);

    return asyncFunction(pageNumber)
      .then((response: any) => {
        setCharacters(prevCharacters => [...prevCharacters, ...response]);
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

  return { status, characters, error };
};

export default useAsync;
