import React, {
    useEffect,
    useState,
    useMemo,
    useContext,
} from "react";
import PropTypes from "prop-types";
import convertData from "../helperFunctions/dataTransformer";
import { SessionContext } from "../pages/_app";
import styles from "../styles/dashboard.module.scss";
import axios from "axios";

import SideDrawer from "../components/SideDrawer/SideDrawer";
import Table from "../components/Table/Table";
import SkeletonTable from "../components/Table/SkeletonTable/SkeletonTable";

function dashboard(props) {
    const { session } = useContext(SessionContext);
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
        if (
            session !== null ||
            localStorage.getItem("token") !== null
        ) {
            let token =
                session !== null
                    ? session
                    : localStorage.getItem("token");
            const config = {
                method: "get",
                baseURL: "https://localhost:44308/api",
                url: "/carparkavailability",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // Make call to DB
            axios(config)
                .then((response) => {
                    // Store the auth
                    const results = convertData(
                        response.data.results
                    );
                    setData(results);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className={styles.background}>
            <SideDrawer>
                {data !== null ? (
                    <Table
                        columns={columns}
                        data={data}
                    ></Table>
                ) : (
                    <SkeletonTable />
                )}
            </SideDrawer>
        </div>
    );
}

dashboard.propTypes = {};

export default dashboard;
