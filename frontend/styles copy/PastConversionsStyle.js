import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
    },
    header: {
        flex: "1 0 10%",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 999,
    },
    body: {
        flex: "auto",
        overflow: "auto",
        position: "absolute",
        top: "12vh",
    },
    typography: {
        padding: "2rem 5rem 1rem 5rem",
    },
    pastContainer: {
        width: "auto",
        margin: "0 5rem",
    },
    cardBody: {
        minHeight: "73vh",
    },
}));
