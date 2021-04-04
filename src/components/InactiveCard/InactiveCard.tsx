import { Card, Typography } from "@material-ui/core";
import { Character } from "../../types/types";
import useStyles from "./styles.js";

interface InactiveCardProps {
  character: Character;
  index: number;
}

const InactiveCard: React.FC<InactiveCardProps> = ({
  character,
  index,
}) => {
  const classes = useStyles();
  return (
    <Card key={index} className={classes.card}>
    <Typography className={classes.typography}>
      {character.name}
    </Typography>
    {character.birth_year}, {character.gender}
  </Card>
  );
};

export default InactiveCard;
