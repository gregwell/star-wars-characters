import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import useAsync from "./hooks/useAsync";
import { fetchCharacters } from "./services/fetchCharacters";
import { Character } from "./types/types";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { status, characters, error } = useAsync(fetchCharacters, pageNumber);

  const loadMoreResults = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        status === "success" && loadMoreResults();
      }
    },
    [status]
  );

  useEffect(() => {
    const options = {
      threshold: 1.0
  };
    const observer = new IntersectionObserver(loadMore, options);
    const currentRef = ref.current;
    if (ref && currentRef) {
      observer.observe(currentRef);
    }
  },[ref, loadMore]);

  /*
  const lastCharacterRef = useCallback(
    (node) => {
      if (status==='pending') return;
        ref.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
          setPageNumber(prevPageNumber => prevPageNumber +1)
        }
      })
    },
    [status]
  )
  */

  return (
    <div className="app-container">
      <Header />
      <div>
        <p>

            <>
              success!
              {characters.map((character: Character, index: number) => {
                
                  return (
                    <p key={index}>
                      {character.name}
                    </p>
                  );
                
              })}
              <div ref={ref}></div>
            </>
          
          {status === "error" && { error }}
          {status === "pending" && "loading..."}
          {status === "idle" && "idle..."}
        </p>
      </div>
      <button onClick={loadMoreResults}>Click here</button>
    </div>
  );
}

export default App;
