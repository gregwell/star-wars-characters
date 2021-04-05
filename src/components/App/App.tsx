import { useState, useRef, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import ActiveCard from "../ActiveCard/ActiveCard";
import InactiveCard from "../InactiveCard/InactiveCard";
import StatusContainer from "../StatusContainer/StatusContainer";
import useCharacters from "../../hooks/useCharacters";
import useFilms from "../../hooks/useFilms";
import { Character } from "../../types/types";

import { Container, Grid } from "@material-ui/core";
import useStyles from "./styles";

function App() {
  const classes = useStyles();

  const [pageNumber, setPageNumber] = useState(1);
  const fetchedCharacters = useCharacters(pageNumber);
  const fetchedFilms = useFilms(false);
  const [activeCard, setActiveCard] = useState<number>();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && fetchedCharacters.hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, fetchedCharacters.hasMore]);

  const toggleActive = (index: number) => {
    setActiveCard(index);
    if (!fetchedFilms.films.length) {
      fetchedFilms.execute();
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={5}
          className={classes.gridContainer}
        >
          {fetchedCharacters.characters.map(
            (character: Character, index: number) => {
              return (
                <Grid item className={classes.gridItem} xs={12} sm={4}>
                  <div onClick={() => toggleActive(index)}>
                    {activeCard === index && (
                      <ActiveCard
                        character={character}
                        films={fetchedFilms.films}
                        filmsStatus={fetchedFilms.status}
                        index={index}
                      />
                    )}
                    {activeCard !== index && (
                      <InactiveCard character={character} index={index} />
                    )}
                  </div>
                </Grid>
              );
            }
          )}
          <div ref={ref}></div>
        </Grid>

        <StatusContainer status={fetchedCharacters.status} />
      </Container>
    </>
  );
}

export default App;
