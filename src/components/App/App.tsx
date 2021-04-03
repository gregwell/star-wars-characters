import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import useCharacters from "../../hooks/useCharacters";
import { fetchCharacters } from "../../services/fetchCharacters";
import { Character } from "../../types/types";

import { Container, Grid, Card, Typography } from "@material-ui/core";
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
                  <Card key={index} className={classes.card}>
                    <Typography className={classes.typography}>
                      {character.name}
                    </Typography>
                    {character.birth_year}, {character.gender}
                  </Card>
                </Grid>
              );
            })}
            <div ref={ref}></div>
          </Grid>
        </>
        {status === "error" && { error }}
        {status === "pending" && "loading..."}
        {status === "idle" && "idle..."}
      </Container>
    </>
  );
}

export default App;
