import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(
            ["margin", "width"],
            {
                easing: theme.transitions.easing.sharp,
                duration:
                    theme.transitions.duration
                        .leavingScreen,
            }
        ),
        backgroundColor: "transparent!important",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(
            ["margin", "width"],
            {
                easing:
                    theme.transitions.easing.easeOut,
                duration:
                    theme.transitions.duration
                        .enteringScreen,
            }
        ),
    },
    menuButton: {
        margin: theme.spacing(2),
        width: "10px",
        display: "flex",
        justifyContent: "flex-start",
        "&:hover": {
            cursor: "pointer",
        },
    },
    hide: {
        display: "none",
        visibility: "hidden",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "black!important",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create(
            "margin",
            {
                easing: theme.transitions.easing.sharp,
                duration:
                    theme.transitions.duration
                        .leavingScreen,
            }
        ),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create(
            "margin",
            {
                easing:
                    theme.transitions.easing.easeOut,
                duration:
                    theme.transitions.duration
                        .enteringScreen,
            }
        ),
        marginLeft: 0,
    },
    skeletonRect: {
        backgroundColor: "grey!important",
        margin: "0.8rem auto",
        borderRadius: "0.3rem",
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    userInfoTextHead: {
        color: "white",
        fontSize: "1.5rem",
        fontWeight: "700",
        margin: "0 0 1rem 0",
    },
    userInfoTextBody: {
        color: "white",
        fontSize: "1rem",
        fontWeight: "700",
        margin: "0 0 0.5rem 0",
    },
    logOut: {
        backgroundColor: "#E91E63!important",
        width: "80%",
        margin: "auto!important",
        "&:hover": {
            backgroundColor: "#e91e629c!important",
        },
    },
}));
