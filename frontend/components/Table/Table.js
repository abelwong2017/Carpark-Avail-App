import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./TableStyles.module.scss";

// Component Imports
import GlobalFilter from "./GlobalFilter/GlobalFilter";
import LotTypeFilter from "./LotTypeFilter/LotTypeFilter";
import { BorderLinearProgress } from "./TableStyles";

// Node Imports
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useFilters,
    usePagination,
} from "react-table";

// MUI Components
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
import Button from "@material-ui/core/Button";

function Table({ columns, data }) {
    data = useMemo(() => [...data], []);

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: LotTypeFilter,
            disableFilters: true,
        }),
        []
    );
    // State and function for table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                pageSize: 5,
                sortBy: [
                    {
                        id: "carparkNumber",
                        desc: true,
                    },
                ],
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    return (
        <div className={styles.componentContainer}>
            <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
            />

            <TableContainer
                component={Paper}
                elevation={3}
            >
                <MaUTable {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(
                            (headerGroup, index) => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                    <TableRow
                                        {...headerGroup.getHeaderGroupProps()}
                                    >
                                        {headerGroup.headers.map(
                                            (
                                                column
                                            ) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <TableCell
                                                    align="center"
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps()
                                                    )}
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
                                                            {column.canSort ? (
                                                                column.isSorted ? (
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
                                                                )
                                                            ) : null}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                    <TableRow
                                        {...headerGroup.getHeaderGroupProps()}
                                        key={
                                            index +
                                            "filterRow"
                                        }
                                        onClick={null}
                                        className={
                                            styles.filterRow
                                        }
                                    >
                                        {headerGroup.headers.map(
                                            (
                                                column,
                                                index
                                            ) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <TableCell
                                                    align="center"
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps()
                                                    )}
                                                    key={
                                                        index +
                                                        "filterCell"
                                                    }
                                                    onClick={
                                                        null
                                                    }
                                                    className={
                                                        styles.filterRow
                                                    }
                                                    style={{
                                                        padding: 0,
                                                    }}
                                                >
                                                    <>
                                                        {column.canFilter
                                                            ? column.render(
                                                                  "Filter"
                                                              )
                                                            : null}
                                                    </>
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                </>
                            )
                        )}
                    </TableHead>
                    <TableBody
                        {...getTableBodyProps()}
                    >
                        {page.map((row, i) => {
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
                                                    {cell
                                                        .column
                                                        .Header ===
                                                    "Percentage Available" ? (
                                                        <>
                                                            <BorderLinearProgress
                                                                variant="determinate"
                                                                value={parseInt(
                                                                    cell.value
                                                                )}
                                                            />
                                                            {cell.render(
                                                                "Cell"
                                                            )}

                                                            %
                                                        </>
                                                    ) : (
                                                        cell.render(
                                                            "Cell"
                                                        )
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
            <div className={styles.controlContainer}>
                <span className={styles.button}>
                    Page {pageIndex + 1} of{" "}
                    {pageOptions.length}
                </span>
                <Button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className={styles.button}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className={styles.button}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

Table.propTypes = {};

export default Table;
