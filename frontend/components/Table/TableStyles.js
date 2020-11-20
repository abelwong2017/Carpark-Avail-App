import {
    makeStyles,
    withStyles,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export const BorderLinearProgress = withStyles(
    (theme) => ({
        root: {
            height: 10,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: "red",
        },
        bar: {
            borderRadius: 5,
            backgroundColor: "green",
        },
    })
)(LinearProgress);
