import React, {
    useEffect,
    useMemo,
    useState,
} from "react";
import PropTypes from "prop-types";
import convertData from "../../helperFunctions/dataTransformer";
import { response } from "../../public/response";

// MUI Components
import { useStyles } from "./TableStyles";

function Table(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    const columns = useMemo(
        () => [
            {
                Header: "Carpark Number",
                accessor: "carparkNumber", // accessor is the "key" in the data
            },
            {
                Header: "Carpark Address",
                accessor: "carparkAddress",
            },
            {
                Header: "Lot Type",
                accessor: "lotType",
            },
            {
                Header: "Available Lots",
                accessor: "availableLots",
            },
            {
                Header: "Total Lots",
                accessor: "totalLots",
            },
            {
                Header: "Percentage Available",
                accessor: "percentageAvailable",
            },
            {
                Header: "Last Updated",
                accessor: "updatedTime",
            },
        ],
        []
    );

    useEffect(() => {
        const results = convertData(response);
        setData(useMemo(() => [...results], []));
    }, []);

    return <div></div>;
}

Table.propTypes = {};

export default Table;
