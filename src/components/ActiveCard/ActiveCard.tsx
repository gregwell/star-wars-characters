import { Card, Typography } from "@material-ui/core";
import { Character, Film } from "../../types/types";
import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ERROR, IDLE, PENDING, SUCCESS } from "../../constants/status";

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
      <p className={classes.category}>BIRTH YEAR</p>
      {character.birth_year}
      <p className={classes.category}>GENDER</p>
      {character.gender}
      <p className={classes.category}>HEIGHT</p>
      {character.height}
      <p className={classes.category}>FILMS PLAYED IN</p>
      {character.films.map(
        (characterFilmUrl: string, characterFilmIndex: number) => {
          return (
            <div key={characterFilmIndex}>
              {filmsStatus === SUCCESS &&
                films.map((film: Film, filmIndex: number) => {
                  return (
                    <div key={filmIndex}>
                      {characterFilmUrl === film.url && <div>{film.title}</div>}
                    </div>
                  );
                })}
            </div>
          );
        }
      )}
      {filmsStatus === PENDING && <CircularProgress size="3rem" />}
      {(filmsStatus === ERROR || filmsStatus === IDLE) && (
        <p>An error occurred while downloading films</p>
      )}
    </Card>
  );
};

export default ActiveCard;
