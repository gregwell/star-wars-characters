import { Card, Typography } from "@material-ui/core";
import { Character, Film } from "../../types/types";
import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ActiveCardProps {
  character: Character;
  films: Array<Film>;
  filmsStatus: string;
  index: number;
}

const ActiveCard: React.FC<ActiveCardProps> = ({
  character,
  films,
  filmsStatus,
  index,
}) => {
  const classes = useStyles();
  return (
    <Card key={index} className={classes.activeCard}>
      <Typography className={classes.typography}>{character.name}</Typography>
      <p>Birth year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
      <p>Height: {character.height}</p>
      {character.films.map(
        (characterFilmUrl: string, characterFilmIndex: number) => {
          return (
            <div key={characterFilmIndex}>
              {filmsStatus === "success" &&
                films.map((film: Film, filmIndex: number) => {
                  return (
                    <div key={filmIndex}>
                      {characterFilmUrl === film.url && <p>{film.title}</p>}
                    </div>
                  );
                })}
            </div>
          );
        }
      )}
      {filmsStatus === "pending" && <CircularProgress size="3rem" />}
      {(filmsStatus === "error" || filmsStatus === "idle") && (
        <p>An error occurred while downloading films</p>
      )}
    </Card>
  );
};

export default ActiveCard;
