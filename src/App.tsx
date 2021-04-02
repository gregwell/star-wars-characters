import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import useAsync from "./hooks/useAsync";
import { fetchCharacters } from "./services/fetchCharacters";
import { Character } from "./types/types";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const characters = useAsync(fetchCharacters, pageNumber);

  return (
    <div className="app-container">
      <Header />
      <div>
        <p>
          {characters.status === "success" && (
            <>
          {characters.value.map((objectMapped:Character, index:number) => {
            return (
              <p key={index}>{objectMapped.name}</p>
            )
          })}
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
