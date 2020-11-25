import React, {
    useEffect,
    useState,
    useMemo,
} from "react";
import PropTypes from "prop-types";
import convertData from "../helperFunctions/dataTransformer";
import { response } from "../public/response";

import Table from "../components/Table/Table";
import SkeletonTable from "../components/Table/SkeletonTable/SkeletonTable";

const test = (props) => {
    const [data, setData] = useState(null);
    const columns = useMemo(
        () => [
            {
                Header: "Carpark Number",
                accessor: "carparkNumber", // accessor is the "key" in the data
                disableFilters: true,
            },
            {
                Header: "Carpark Address",
                accessor: "carparkAddress",
                disableFilters: true,
            },
            {
                Header: "Lot Type",
                accessor: "lotType",
                filter: "includes",
                disableFilters: false,
            },
            {
                Header: "Available Lots",
                accessor: "availableLots",
                disableFilters: true,
            },
            {
                Header: "Total Lots",
                accessor: "totalLots",
                disableFilters: true,
            },
            {
                Header: "Percentage Available",
                accessor: "percentageAvailable",
                disableFilters: true,
            },
            {
                Header: "Last Updated",
                accessor: "updatedTime",
                disableFilters: true,
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
            ) : (
                <SkeletonTable />
            )}
        </div>
    );
};

test.propTypes = {};

export default test;
