import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import useAsync from "./hooks/useAsync";
import { fetchCharacters } from "./services/fetchCharacters";
import { Character } from "./types/types";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const { status, characters, error} = useAsync(fetchCharacters, pageNumber);

  const loadMoreResults = () => {
    setPageNumber(pageNumber+1);
  };

  return (
    <div className="app-container">
      <Header />
      <div>
        <p>
          {status === "success" && (
            <>
              success!
              {characters.map(
                (objectMapped: Character, index: number) => {
                  return <p key={index}>{objectMapped.name}</p>;
                }
              )}
            </>
          )}
          {status === "error" && {error}}
          {status === "pending" && "pending..."}
          {status === "idle" && "idle..."}
        </p>
      </div>
      <button
        onClick={loadMoreResults}
      >
        Click here
      </button>
    </div>
  );
}

export default App;
