import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  card: {
    backgroundColor: "black",
    opacity: "85%",
    width: "98%",
    color: "white",
    margin: "5",
    height: "20vw",
    textAlign: "center",
    borderRadius: "10px",
    padding: "25%",
    "&:hover, &:focus": {
      border: "solid 2px yellow",
      color: "yellow",
    },
  },
  typography: {
    fontSize: "3vh",
  },
}));
