import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/login.module.scss";

// import components
import LoginForm from "../components/LoginForm/LoginForm";

function login(props) {
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
