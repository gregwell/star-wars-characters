import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import useAsync from "./hooks/useAsync";
import { fetchCharacters } from "./services/fetchCharacters";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const characters = useAsync<string>(fetchCharacters, pageNumber);


  return (
    <div className="app-container">
      <Header />
      <div>Names</div>
      <div>Name</div>
      <div>Name</div>
      <div>Name</div>
      <div>circular progress...</div>
      <div>
        <p>{characters.status==='success' && ""}</p>
      </div>
    </div>
  );
}

export default App;
