import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/dashboard.module.scss";

import SideDrawer from "../components/SideDrawer/SideDrawer";

function dashboard(props) {
    return (
        <div className={styles.background}>
            <SideDrawer>Testing</SideDrawer>
        </div>
    );
}

dashboard.propTypes = {};

export default dashboard;
