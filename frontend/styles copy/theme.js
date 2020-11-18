import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "Montserrat",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    palette: {
        primary: {
            main: "#FF006E",
        },
        secondary: {
            main: "#8338EC",
        },
        tertiary: {
            main: "#FFBE0B",
        },
        background: {
            default: "#fff",
        },
    },
    zIndex: {
        drawer: 998,
    },
});

export default theme;
