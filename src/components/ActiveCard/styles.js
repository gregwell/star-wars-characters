import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  activeCard: {
    backgroundColor: "black",
    opacity: "80%",
    width: "100%",
    color: "white",
    margin: "5",
    height: "40vh",
    textAlign: "center",
    borderRadius: "10px",
  },
  typography: {
    fontSize: "3vh",
    backgroundColor: "yellow",
    color: "black",
    marginBottom: "20px",
  },
  category: {
    fontSize: "1.5vh",
    marginTop: "4px",
    marginBottom: "4px",
    fontWeight: "bold",
    color: "yellow",
    textTransform: "uppercase",
  },
}));
