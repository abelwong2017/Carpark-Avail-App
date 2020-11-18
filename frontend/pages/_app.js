import React, {
    useState,
    useEffect,
    createContext,
} from "react";
import { AnimatePresence } from "framer-motion";

// Next Imports
import Head from "next/head";
import PropTypes from "prop-types";

// MUI Imports
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Other Imports
import "../styles/globals.css";
import theme from "../styles/theme";

export const OriginalImageUrlContext = createContext();
function MyApp({ Component, pageProps }) {
    const [originalUrl, setOriginalUrl] = useState([]);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector(
            "#jss-server-side"
        );

        if (jssStyles) {
            jssStyles.parentElement.removeChild(
                jssStyles
            );
        }
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <AnimatePresence exitBeforeEnter>
                        <OriginalImageUrlContext.Provider
                            value={{
                                originalUrl,
                                setOriginalUrl,
                            }}
                        >
                            <Component
                                {...pageProps}
                            />
                        </OriginalImageUrlContext.Provider>
                    </AnimatePresence>
            </ThemeProvider>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp;
