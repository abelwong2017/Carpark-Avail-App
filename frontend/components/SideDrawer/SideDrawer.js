import React, {
    useState,
    useContext,
    useEffect,
} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useStyles } from "./SideDrawerStyles";
import { SessionContext } from "../../pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./SideDrawer.module.scss";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Skeleton from "@material-ui/lab/Skeleton";

function SideDrawer({ children }) {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { session, setSession } = useContext(
        SessionContext
    );
    const [userInfo, setUserInfo] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOuthandler = () => {
        setSession(null);
        localStorage.removeItem("token");
        router.push("/login");
    };

    // Check if user authenticated
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
                baseURL:
                    process.env
                        .NEXT_PUBLIC_BACKEND_URL,
                url: "/users",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // Make call to DB
            axios(config)
                .then((response) => {
                    // Store the auth
                    setUserInfo({ ...response.data });
                    setOpen(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                elevation={0}
            >
                <div
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerOpen}
                    className={clsx(
                        classes.menuButton,
                        open && classes.hide
                    )}
                >
                    <MenuIcon
                        style={{ color: "white" }}
                    />
                </div>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton
                        onClick={handleDrawerClose}
                    >
                        <ChevronLeftIcon
                            style={{
                                color: "white",
                                width: "40px",
                                height: "40px",
                            }}
                        />
                    </IconButton>
                </div>
                <img
                    src="/dashboardProfile.jpg"
                    width="100%"
                    style={{
                        transform: "translateY(-20px)",
                    }}
                />
                {userInfo !== null ? (
                    <div className={classes.userInfo}>
                        <span
                            className={
                                classes.userInfoTextHead
                            }
                        >
                            Hello {userInfo.firstName}{" "}
                            {userInfo.lastName}
                        </span>
                        <span
                            className={
                                classes.userInfoTextBody
                            }
                        >
                            {userInfo.email}
                        </span>
                        <span
                            className={
                                classes.userInfoTextBody
                            }
                        >
                            {userInfo.contactNumber !==
                            null
                                ? ` 
                            ${userInfo.ContactNumber}`
                                : ""}
                        </span>
                        <Button
                            className={classes.logOut}
                            onClick={logOuthandler}
                        >
                            Log Out
                        </Button>
                    </div>
                ) : (
                    Array.from({ length: 3 }, () =>
                        Math.floor(Math.random() * 100)
                    ).map((int, index) => {
                        return (
                            <Skeleton
                                key={
                                    index + "skeleton"
                                }
                                variant="rect"
                                className={
                                    classes.skeletonRect
                                }
                                width={"95%"}
                                height={30}
                            />
                        );
                    })
                )}
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div
                    className={classes.drawerHeader}
                />
                <div className={styles.backdrop}>
                    {children}
                </div>
            </main>
        </div>
    );
}

SideDrawer.propTypes = {};

export default SideDrawer;
