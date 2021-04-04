import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  content: {},
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
  gridItem: {
    width: "33%",
  },
  typography: {
    fontSize: "3vh",
  },
  gridContainer: {
    marginTop: "100px",
    marginBottom: "30px",
  },
  statusContainer: {
    textAlign: "center",
    color: "white",
  }
}));
