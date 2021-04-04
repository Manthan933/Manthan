import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import Slide from '@material-ui/core/Slide';
import themes from "../../utils/themes";
import { SET_THEME } from "../../actions/types";
import { saveTheme } from "../../actions/ui";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        padding: "10px 20px",
        display: "flex"
    },
    wallpaper: {
        margin: "auto 0",
        fontSize: "40px"
    },
    title: {
        fontSize: "25px",
        paddingLeft: "10px",
        fontFamily: 'Roboto',
        fontWeight: "bold",
        letterSpacing: "2px"
    },

    themesSection: {
        display: "flex",
        flexWrap: "wrap"
    },
    theme: {
        width: "45%",
        height: "150px",
        margin: "10px",
        cursor: "pointer"
    },
    setTheme: {
        width: "45%",
        height: "150px",
        margin: "10px",
        cursor: "pointer",
        boxShadow: "10px 20px 10px black",
        transition: "0.3s all"

    },
    button: {
        padding: "10px 40px",
        backgroundColor: "black",
        color: "white",
        width: "20%",
        border: "none",
        fontSize: "15px",
        borderRadius: "5px",
        cursor: "pointer"
    },
    '@media screen and (max-width: 500px)': {
        theme: {
            width: "100%",
            height: "250px"
        }
    }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Dashboard = (props) => {
    const classes = useStyles();

    const { open, handleClose } = props;
    const saveThemeCurr = () => {
        props.saveTheme(props.activeTheme);
        handleClose();
    }
    return (
        <Dialog

            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div className={classes.titleSection}>
                <WallpaperIcon className={classes.wallpaper} />
                <p className={classes.title}>Choose Your Custom Theme</p>
            </div>

            <DialogContent>
                <div className={classes.themesSection}>
                    {
                        themes.map((theme) => {
                            return (
                                <img onClick={() => props.setTheme(theme)} className={props.activeTheme === theme ? classes.setTheme : classes.theme} src={theme} alt="sd" />
                            )
                        })
                    }

                </div>
            </DialogContent>
            {
                props.activeTheme ? (
                    <DialogActions>
                        <button onClick={saveThemeCurr} className={classes.button}>Set</button>
                    </DialogActions>
                ) : null
            }

        </Dialog>
    );
};

Dashboard.propTypes = {
    classroom: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    classroom: state.classroom,
    activeTheme: state.ui.theme
});

const mapDispatchToProps = (dispatch) => {
    return {
        setTheme: (theme) => dispatch({ type: SET_THEME, payload: theme }),
        saveTheme: (theme) => dispatch(saveTheme(theme))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
