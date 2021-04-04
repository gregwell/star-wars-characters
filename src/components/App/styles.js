import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    content: {

    },
    card: {
        backgroundColor: "black",
        opacity: "85%",
        width: "98%",
        color: "white",
        margin: "5",
        height: "20vw",
        textAlign: "center",
        borderRadius: "10px",
        padding:"25%",
        "&:hover, &:focus": {
            border: "solid 1px yellow",
            color: "yellow"
        }
    },
    gridItem: {
        width: "33%",
    },
    typography: {
        fontSize: "3vh"
    },
    gridContainer: {
        marginTop: "100px"
    }
}));
