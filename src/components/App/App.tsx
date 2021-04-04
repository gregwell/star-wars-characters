import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import useCharacters from "../../hooks/useCharacters";
import { fetchCharacters } from "../../services/fetchCharacters";
import { Character } from "../../types/types";

import { Container, Grid, Card, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

function App() {
  const classes = useStyles();

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

  const [activeCard, setActiveCard] = useState<number>();

  const toggleActive = (index: number) => {
    setActiveCard(index);
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
            {characters.map((character: Character, index: number) => {
              return (
                <Grid item className={classes.gridItem} xs={12} sm={4}>
                  <div onClick={() => toggleActive(index)}>
                    <Card key={index} className={classes.card}>
                      <Typography className={classes.typography}>
                        {character.name}
                      </Typography>
                      {character.birth_year}, {character.gender}
                      {activeCard === index && <p>this card is active!</p>}
                    </Card>
                  </div>
                </Grid>
              );
            })}
            <div ref={ref}></div>
          </Grid>
        </>
        <div className={classes.statusContainer}>
          {status === "pending" && <CircularProgress size="4rem" />}
          {status === "error" && "Error: " + { error }}
          {status === "idle" && "Something went wrong. Try again later!"}
        </div>
      </Container>
    </>
  );
}

export default App;
