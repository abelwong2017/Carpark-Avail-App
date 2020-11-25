import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserErrorModal from "./UserErrorModal/UserErrorModal";
import { useStyles } from "./LoginFormStyles";
import { SessionContext } from "../../pages/_app";
import { useRouter } from "next/router";

// Node components
import { Formik, Form, Field } from "formik";
import axios from "axios";

// MUI components
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { TextField } from "formik-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";

function LoginForm(props) {
    const classes = useStyles();
    const router = useRouter();
    const { session, setSession } = useContext(
        SessionContext
    );
    const [
        isExistingUser,
        setIsExistingUser,
    ] = useState(true);

    // Error modal
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState(
        false
    );

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const onError = (err) => {
        setErrMessage(err);
    };

    return (
        <div className={classes.container}>
            {/* User Card */}
            <UserErrorModal
                open={open}
                handleClose={handleClose}
                error={errMessage}
            />

            <div className={classes.buttonsGroup}>
                {/* Existing User Button */}
                <Button
                    className={classes.buttonLeft}
                    style={{
                        borderBottomColor: isExistingUser
                            ? "white"
                            : "transparent",
                        color: isExistingUser
                            ? "white"
                            : "grey",
                    }}
                    onClick={() =>
                        setIsExistingUser(true)
                    }
                >
                    Existing User
                </Button>

                {/* New User Button */}
                <Button
                    className={classes.buttonRight}
                    style={{
                        borderBottomColor: !isExistingUser
                            ? "white"
                            : "transparent",
                        color: !isExistingUser
                            ? "white"
                            : "grey",
                    }}
                    onClick={() =>
                        setIsExistingUser(false)
                    }
                >
                    New User
                </Button>
            </div>

            <Divider className={classes.divider} />

            {/* Form */}
            <div className={classes.form}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        repassword: "",
                        firstName: "",
                        lastName: "",
                        contactNumber: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email =
                                "Invalid email address";
                        }
                        if (!values.password) {
                            errors.password =
                                "Required";
                        }
                        if (
                            !isExistingUser &&
                            !values.firstName
                        ) {
                            errors.firstName =
                                "Required";
                        }
                        if (
                            !isExistingUser &&
                            !values.lastName
                        ) {
                            errors.lastName =
                                "Required";
                        }

                        if (
                            !isExistingUser &&
                            !values.repassword
                        ) {
                            errors.repassword =
                                "Required";
                        }
                        if (
                            !isExistingUser &&
                            values.password !==
                                values.repassword &&
                            values.repassword
                        ) {
                            errors.repassword =
                                "Passwords do not match";
                        }

                        return errors;
                    }}
                    onSubmit={(
                        values,
                        { setSubmitting }
                    ) => {
                        // Call login API
                        if (isExistingUser) {
                            let data = {
                                Email: values.email,
                                Password:
                                    values.password,
                            };

                            // data = JSON.stringify(
                            //     data
                            // );

                            const config = {
                                method: "post",
                                baseURL:
                                    process.env
                                        .NEXT_PUBLIC_BACKEND_URL,
                                url: "/session",
                                headers: {},
                                data: data,
                            };
                            // Make call to DB
                            axios(config)
                                .then((response) => {
                                    // Store the auth
                                    setSession(
                                        response.data
                                            .token
                                    );
                                    localStorage.setItem(
                                        "token",
                                        response.data
                                            .token
                                    );

                                    setSubmitting(
                                        false
                                    );

                                    router.push(
                                        "/dashboard"
                                    );
                                })
                                .catch((err) => {
                                    setSubmitting(
                                        false
                                    );
                                    onError(
                                        "User / Password is Incorrect"
                                    );
                                    // Handle toggle for error modal here
                                    handleToggle();
                                });
                        } else {
                            // Call API for register
                            let data = {
                                Email: values.email,
                                password:
                                    values.password,
                                FirstName:
                                    values.firstName,
                                LastName:
                                    values.lastName,
                                ContactNumber: !!values.contactNumber
                                    ? values.contactNumber
                                    : null,
                            };

                            let config = {
                                method: "post",
                                baseURL:
                                    process.env
                                        .NEXT_PUBLIC_BACKEND_URL,
                                url: "/users",
                                headers: {},
                                data: data,
                            };
                            axios(config)
                                .then((response) => {
                                    if (
                                        response.data
                                            .email
                                    ) {
                                        let data = {
                                            Email:
                                                values.email,
                                            Password:
                                                values.password,
                                        };

                                        const config = {
                                            method:
                                                "post",
                                            baseURL:
                                                process
                                                    .env
                                                    .NEXT_PUBLIC_BACKEND_URL,
                                            url:
                                                "/session",
                                            headers: {},
                                            data: data,
                                        };
                                        // Make call to DB
                                        return axios(
                                            config
                                        );
                                    }
                                })
                                .then((res) => {
                                    setSession(
                                        res.data.token
                                    );
                                    localStorage.setItem(
                                        "token",
                                        response.data
                                            .token
                                    );

                                    setSubmitting(
                                        false
                                    );
                                    router.push(
                                        "/dashboard"
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);

                                    setSubmitting(
                                        false
                                    );
                                    // Handle toggle for error modal here
                                    onError(
                                        "Username is already taken"
                                    );
                                    handleToggle();
                                });
                        }
                    }}
                >
                    {({
                        submitForm,
                        isSubmitting,
                        isValid,
                        dirty,
                    }) => (
                        <Form>
                            <Field
                                component={TextField}
                                name="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    classes: {
                                        root:
                                            classes.cssLabel,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root:
                                            classes.inputCss,
                                    },
                                }}
                            />
                            <br />
                            <Field
                                component={TextField}
                                type="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                InputLabelProps={{
                                    classes: {
                                        root:
                                            classes.cssLabel,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root:
                                            classes.inputCss,
                                    },
                                }}
                            />
                            {!isExistingUser ? (
                                <>
                                    <br />
                                    <Field
                                        component={
                                            TextField
                                        }
                                        type="password"
                                        label="Re-enter Password"
                                        name="repassword"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{
                                            classes: {
                                                root:
                                                    classes.cssLabel,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root:
                                                    classes.inputCss,
                                            },
                                        }}
                                    />
                                    <Field
                                        component={
                                            TextField
                                        }
                                        type="text"
                                        label="First Name"
                                        name="firstName"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{
                                            classes: {
                                                root:
                                                    classes.cssLabel,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root:
                                                    classes.inputCss,
                                            },
                                        }}
                                    />{" "}
                                    <Field
                                        component={
                                            TextField
                                        }
                                        type="text"
                                        label="Last Name"
                                        name="lastName"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{
                                            classes: {
                                                root:
                                                    classes.cssLabel,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root:
                                                    classes.inputCss,
                                            },
                                        }}
                                    />{" "}
                                    <Field
                                        component={
                                            TextField
                                        }
                                        type="number"
                                        label="Contact Number"
                                        name="contactNumber"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        InputLabelProps={{
                                            classes: {
                                                root:
                                                    classes.cssLabel,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root:
                                                    classes.inputCss,
                                            },
                                        }}
                                    />{" "}
                                </>
                            ) : null}
                            {isSubmitting && (
                                <LinearProgress />
                            )}
                            <br />

                            <Button
                                className={
                                    classes.submitButton
                                }
                                variant="contained"
                                color="primary"
                                disabled={
                                    isSubmitting ||
                                    !(isValid && dirty)
                                }
                                onClick={submitForm}
                            >
                                {isExistingUser
                                    ? "Login"
                                    : "Register"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

LoginForm.propTypes = {};

export default LoginForm;
