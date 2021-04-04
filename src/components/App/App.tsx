import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import useCharacters from "../../hooks/useCharacters";
import useFilms from "../../hooks/useFilms";
import { Character } from "../../types/types";

import { Container, Grid, Card, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";
import ActiveCard from "../ActiveCard/ActiveCard";

function App() {
  const classes = useStyles();

  const [pageNumber, setPageNumber] = useState(1);
  const fetchedCharacters = useCharacters(pageNumber);

  const fetchedFilms = useFilms(false);

  const loadMoreResults = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && fetchedCharacters.hasMore) {
        fetchedCharacters.status === "success" && loadMoreResults();
      }
    },
    [fetchedCharacters.status, fetchedCharacters.hasMore]
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

  const [activeCard, setActiveCard] = useState<number>();

  const toggleActive = (index: number) => {
    setActiveCard(index);
    if (!fetchedFilms.films.length) {
      fetchedFilms.execute();
    }
  };

  return (
    <>
      <Navbar />
      <Container className={classes.content}>
        <>
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
                        <Card key={index} className={classes.card}>
                          <Typography className={classes.typography}>
                            {character.name}
                          </Typography>
                          {character.birth_year}, {character.gender}
                        </Card>
                      )}
                    </div>
                  </Grid>
                );
              }
            )}
            <div ref={ref}></div>
          </Grid>
        </>
        <div className={classes.statusContainer}>
          {fetchedCharacters.status === "pending" && <CircularProgress size="4rem" />}
          {fetchedCharacters.status === "error" && "Error: " + fetchedCharacters.error}
          {fetchedCharacters.status === "idle" &&
            "Something went wrong. Try again later!"}
        </div>
      </Container>
    </>
  );
}

export default App;
