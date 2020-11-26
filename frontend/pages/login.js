import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from "../styles/login.module.scss";
import { useRouter } from "next/router";
import { SessionContext } from "./_app";
import { motion } from "framer-motion";

// import components
import LoginForm from "../components/LoginForm/LoginForm";

function login(props) {
    const router = useRouter();
    const { session } = useContext(SessionContext);
    const easing = [0.61, 1, 0.88, 1];

    useEffect(() => {
        if (
            session !== null ||
            localStorage.getItem("token") !== null
        ) {
            router.push("/dashboard");
        }
    }, []);
    return (
        <div className={styles.background}>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                exit={{ opacity: 1 }}
            >
                <motion.div
                    initial={{
                        y: 200,
                    }}
                    animate={{ y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.6,
                        ease: easing,
                    }}
                    exit={{ opacity: 0 }}
                    className={styles.header}
                >
                    Carpark Availabilty Finder
                </motion.div>
            </motion.div>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 1.1,
                }}
                exit={{ opacity: 1 }}
                className={styles.backdrop}
            >
                <LoginForm />
            </motion.div>
        </div>
    );
}

login.propTypes = {};

export default login;
