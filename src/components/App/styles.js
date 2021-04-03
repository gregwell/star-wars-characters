import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    content: {

    },
    card: {
        backgroundColor: "black",
        opacity: "85%",
        width: "100%",
        color: "white",
        margin: "5",
        height: "20vw",
        textAlign: "center",
        borderRadius: "10px",
        padding:"25%",
        "&:hover, &:focus": {
            backgroundColor: "#020A1E",
        }
    },
    gridItem: {
        width: "33%",
    },
    typography: {
        fontSize: "3vh",
    },
    gridContainer: {
        marginTop: "100px"
    }
}));
