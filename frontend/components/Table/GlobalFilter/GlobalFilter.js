import React, { useState } from "react";
import PropTypes from "prop-types";

// Imports
import styles from "./GlobalFilter.module.scss";

// Node modules
import { useAsyncDebounce } from "react-table";

// MUI components
import TextField from "@material-ui/core/TextField";

function GlobalFilter({ filter, setFilter }) {
    const [value, setValue] = useState(filter);

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 300);

    return (
        <div className={styles.container}>
            <TextField
                id="standard-basic"
                value={value || ""}
                label="Search"
                placeholder="Search Here"
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                InputLabelProps={{
                    classes: {
                        root: styles.cssLabel,
                    },
                }}
                InputProps={{
                    classes: {
                        root: styles.inputCss,
                    },
                }}
            />
        </div>
    );
}

GlobalFilter.propTypes = {};

export default GlobalFilter;
