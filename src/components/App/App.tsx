import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import useCharacters from "../../hooks/useCharacters";
import useFilms from "../../hooks/useFilms";
import { Character, Film } from "../../types/types";

import { Container, Grid, Card, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

function App() {
  const classes = useStyles();

  const [pageNumber, setPageNumber] = useState(1);
  const characters = useCharacters(pageNumber);

  const films = useFilms(false);

  const loadMoreResults = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && characters.hasMore) {
        characters.status === "success" && loadMoreResults();
      }
    },
    [characters.status, characters.hasMore]
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
    films.execute();
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
            {characters.characters.map((character: Character, index: number) => {
              return (
                <Grid item className={classes.gridItem} xs={12} sm={4}>
                  <div onClick={() => toggleActive(index)}>
                    {activeCard === index && (
                      <Card key={index} className={classes.activeCard}>
                        <Typography className={classes.typography}>
                          {character.name}
                        </Typography>
                        <p>Birth year: {character.birth_year}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Height: {character.height}</p>
                        {character.films.map(
                          (
                            characterFilmUrl: string,
                            characterFilmIndex: number
                          ) => {
                            return (
                              <div key={characterFilmIndex}>
                                {films.status === "success" &&
                                  films.films.map(
                                    (film: Film, filmIndex: number) => {
                                      return (
                                        <div key={filmIndex}>
                                          {characterFilmUrl === film.url && (
                                            <p>{film.title}</p>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            );
                          }
                        )}
                        {films.status === "pending" && (
                          <CircularProgress size="3rem" />
                        )}
                        {(films.status === "error" ||
                          films.status === "idle") && (
                          <p>An error occurred while downloading films</p>
                        )}
                      </Card>
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
            })}
            <div ref={ref}></div>
          </Grid>
        </>
        <div className={classes.statusContainer}>
          {characters.status === "pending" && <CircularProgress size="4rem" />}
          {characters.status === "error" && "Error: " +  characters.error }
          {characters.status === "idle" && "Something went wrong. Try again later!"}
        </div>
      </Container>
    </>
  );
}

export default App;
