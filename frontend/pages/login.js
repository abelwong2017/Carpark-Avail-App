import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from "../styles/login.module.scss";
import { useRouter } from "next/router";
import { SessionContext } from "./_app";

// import components
import LoginForm from "../components/LoginForm/LoginForm";

function login(props) {
    const router = useRouter();
    const { session } = useContext(SessionContext);
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
            <div className={styles.header}>
                Carpark Availabilty Finder
            </div>
            <div className={styles.backdrop}>
                <LoginForm />
            </div>
        </div>
    );
}

login.propTypes = {};

export default login;
