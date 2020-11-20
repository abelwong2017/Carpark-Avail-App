import React, { useState } from "react";
import PropTypes from "prop-types";

// imports
import styles from "./LotTypeFilter.module.scss";

// MUI
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

function LotTypeFilter({ column }) {
    const {
        filterValue = "",
        setFilter,
        preFilteredRows,
        id,
    } = column;

    // Cal options for filtering
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });

        return [...options.values()];
    }, [id, preFilteredRows]);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };
    return (
        <div className={styles.container}>
            <div>
                <TextField
                    id="standard-select-lot-type"
                    select
                    label=""
                    value={filterValue}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                    helperText="Select a filter"
                >
                    <MenuItem key="All" value="">
                        All
                    </MenuItem>
                    {options.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    );
}

LotTypeFilter.propTypes = {};

export default LotTypeFilter;
