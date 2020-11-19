import React, {
    useEffect,
    useState,
    useMemo,
} from "react";
import PropTypes from "prop-types";
import convertData from "../helperFunctions/dataTransformer";
import { response } from "../public/response";

import Table from "../components/Table/Table";

const test = (props) => {
    const [data, setData] = useState(null);
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

    // Load data
    useEffect(() => {
        const results = convertData(response);
        setData(results);
    }, []);

    return (
        <div>
            {data !== null ? (
                <Table
                    columns={columns}
                    data={data}
                ></Table>
            ) : null}
        </div>
    );
};

test.propTypes = {};

export default test;
