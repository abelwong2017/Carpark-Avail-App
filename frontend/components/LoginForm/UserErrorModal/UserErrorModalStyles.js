import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    backdrop: {
        zIndex: "999!important",
        color: "#fff",
    },
    title: {
        fontSize: "1rem",
    },
    retryButton: {
        margin: "auto!important",
    },
}));
