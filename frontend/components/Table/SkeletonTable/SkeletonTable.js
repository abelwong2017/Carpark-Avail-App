import React from "react";
import PropTypes from "prop-types";

import styles from "./SkeletonTable.module.scss";

import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

function SkeletonTable(props) {
    return (
        <div className={styles.componentContainer}>
            <Paper
                className={styles.paper}
                elevation={3}
            >
                <Skeleton
                    variant="rect"
                    width={"100%"}
                    height={160}
                    className={styles.skeleton}
                />
                {Array.from({ length: 6 }, () =>
                    Math.floor(Math.random() * 100)
                ).map((int, index) => {
                    return (
                        <Skeleton
                            key={index + "skeleton"}
                            variant="rect"
                            className={
                                styles.skeletonButton
                            }
                            width={"100%"}
                            height={60}
                        />
                    );
                })}
            </Paper>
        </div>
    );
}

SkeletonTable.propTypes = {};

export default SkeletonTable;
