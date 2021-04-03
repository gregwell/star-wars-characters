import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import useCharacters from "../../hooks/useCharacters";
import { fetchCharacters } from "../../services/fetchCharacters";
import { Character } from "../../types/types";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { status, characters, error, hasMore } = useCharacters(
    fetchCharacters,
    pageNumber
  );

  const loadMoreResults = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        status === "success" && loadMoreResults();
      }
    },
    [status, hasMore]
  );

  useEffect(() => {
    const options = {
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(loadMore, options);
    const currentRef = ref.current;
    if (ref && currentRef) {
      observer.observe(currentRef);
    }
  }, [ref, loadMore]);

  return (
    <>
    <div className="header-container">
      <Header />
    </div>
    
    <div className="app-container">
      <div>
          <>
            {characters.map((character: Character, index: number) => {
              return (
                <div key={index} className="character-container">
                  {character.name}, {character.birth_year}, {character.gender}
                </div>
              );
            })}
            <div ref={ref}></div>
          </>
          {status === "error" && { error }}
          {status === "pending" && "loading..."}
          {status === "idle" && "idle..."}
      </div>
    </div>
    </>
  );
}

export default App;
