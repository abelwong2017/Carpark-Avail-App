import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    buttonsGroup: {
        width: "100%",
        padding: "1rem",
    },
    buttonLeft: {
        width: "50%",
        borderRadius: "0",
        borderBottom: "3px solid",
        // backgroundColor: theme.palette.tertiary.main,
        color: "white",
        fontWeight: "bold",
    },
    cssLabel: {
        color: "white!important",
    },
    inputCss: { color: "white!important" },
    buttonRight: {
        width: "50%",
        borderRadius: "0",
        borderBottom: "3px solid",
        color: "grey",
        fontWeight: "bold",
    },
    divider: {
        width: "100%",
    },
    form: {
        padding: "1rem",
        width: "100%",
    },
    submitButton: {
        margin: "1rem",
    },
}));
