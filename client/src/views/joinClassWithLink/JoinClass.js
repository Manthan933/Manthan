import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { joinClass } from "../../actions/actions";
const useStyles = makeStyles({
    root: {


        width: "600px",

        boxShadow: "2px 3px 4px grey",
        borderRadius: "10px",
        margin: "100px auto",
        textAlign: "center"
    },
    inner: {
        padding: "20px",

        justifyContent: "center",
        alignContent: "center"
    },
    tag: {
        fontSize: "25px",
        fontWeight: "bold",
        fontFamily: "Open Sans",


    },
    button: {
        margin: "0 10px"
    }

});

const toggleJoinClass = (status, data) => {
    if (status) {


        data.JoinClass(data.user, data.classes, data.setClasses, data.match.params.code);

    } else {
        window.location.href = "http://localhost:3000"
    }
}
export default function JoinClass(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.inner}>
                <p className={classes.tag}>Are you sure you want to join class?</p>
                <Button className={classes.button} color="secondary" onClick={() => joinClass(props.user, props.Classes, props.setClasses, props.match.params.code)} variant="contained">YES</Button>
                <Button className={classes.button} color="primary" onClick={() => toggleJoinClass(false, null)} variant="contained">NO</Button>
            </div>

        </div >
    )
}
