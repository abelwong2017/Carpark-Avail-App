import React, {
    useEffect,
    useMemo,
    useState,
} from "react";
import PropTypes from "prop-types";
import styles from "./TableStyles.module.scss";

// Node Imports
import { useTable, useSortBy } from "react-table";

// MUI Components
import { useStyles } from "./TableStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TableContainer from "@material-ui/core/TableContainer";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SortIcon from "@material-ui/icons/Sort";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function Table({ columns, data }) {
    const classes = useStyles();
    data = useMemo(() => [...data], []);
    // State and function for table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: "carparkNumber",
                        desc: true,
                    },
                ],
            },
        },
        useSortBy
    );

    return (
        <TableContainer
            component={Paper}
            elevation={3}
        >
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(
                        (headerGroup) => (
                            // eslint-disable-next-line react/jsx-key
                            <TableRow
                                {...headerGroup.getHeaderGroupProps()}
                            >
                                {headerGroup.headers.map(
                                    (column) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <TableCell
                                            align="center"
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                            sortDescFirst="true"
                                        >
                                            <div
                                                className={
                                                    styles.headerContainer
                                                }
                                            >
                                                {column.render(
                                                    "Header"
                                                )}{" "}
                                                <span
                                                    className={
                                                        styles.logoContainer
                                                    }
                                                >
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <ArrowDownwardIcon
                                                                className={
                                                                    styles.logo
                                                                }
                                                            />
                                                        ) : (
                                                            <ArrowUpwardIcon
                                                                className={
                                                                    styles.logo
                                                                }
                                                            />
                                                        )
                                                    ) : (
                                                        <SortIcon
                                                            className={
                                                                styles.logo
                                                            }
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        )
                    )}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <TableRow
                                {...row.getRowProps()}
                            >
                                {row.cells.map(
                                    (cell) => {
                                        return (
                                            // eslint-disable-next-line react/jsx-key
                                            <TableCell
                                                align="center"
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render(
                                                    "Cell"
                                                )}
                                            </TableCell>
                                        );
                                    }
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MaUTable>
        </TableContainer>
    );
}

Table.propTypes = {};

export default Table;
