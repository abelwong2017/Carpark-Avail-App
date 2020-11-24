import React from "react";
import PropTypes from "prop-types";

import { useStyles } from "./UserErrorModalStyles";

// MUI components
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const UserErrorModal = ({
    open,
    handleClose,
    error,
}) => {
    const classes = useStyles();
    return (
        <div>
            <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
            >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            {error}
                        </Typography>

                        <Typography
                            variant="body2"
                            component="p"
                        >
                            Please Try Again
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            className={
                                classes.retryButton
                            }
                            size="small"
                            onClick={handleClose}
                        >
                            Retry
                        </Button>
                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    );
};

UserErrorModal.propTypes = {};

export default UserErrorModal;
