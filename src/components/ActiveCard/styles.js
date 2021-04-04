import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  activeCard: {
    backgroundColor: "yellow",
    opacity: "80%",
    width: "100%",
    color: "black",
    margin: "5",
    height: "20vw",
    textAlign: "center",
    borderRadius: "10px",
    padding: "25%",
    "&:hover, &:focus": {
      border: "solid 2px yellow",
      color: "black",
    },
  },
  typography: {
    fontSize: "3vh",
  },
}));
