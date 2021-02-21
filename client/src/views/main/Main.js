import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import FloatingButton from "../../components/FloatingButtons/ClassButton";
import ClassCard from "../../components/ClassCard/ClassCard";
import { createClass, joinClass } from "../../actions/actions";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  noClass: {
    backgroundImage:
      "url(https://www.gstatic.com/classroom/documents_floating_into_folder.png)",
    position: "absolute",
    height: "450px",
    width: "370px",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
    marginTop: "10%",
  },
  text: {
    position: "absolute",
    bottom: "0px",
    left: "24%",
  },
  classContainer: {
    justifyContent: "center",
  },
  "@media screen and (min-width: 32em)": {
    classContainer: {
      justifyContent: "left",
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
}));

export default function SpacingGrid(props) {
  const classes = useStyles();
  const { Classes, setClasses, user, UpdateClass } = props;
  const CreateClass = (newClass) => {
    createClass(newClass, user, Classes, setClasses);
  };

  const JoinClass = (classCode) => {
    joinClass(user, Classes, setClasses, classCode);
  };
  return (
    <div>
      <Container className={classes.root}>
        {Classes.length ? (
          <Grid container className={classes.classContainer} spacing={5}>
            {Classes.map((Class) => {
              return (
                <ClassCard
                  key={Class.code}
                  Class={Class}
                  userId={user.email}
                  setClasses={setClasses}
                  UpdateClass={UpdateClass}
                  admin={user.email === Class.instructor.email}
                />
              );
            })}
          </Grid>
        ) : (
          <Grid container justify='center' spacing={5}>
            <div className={classes.noClass}>
              <footer className={classes.text}>
                <Typography variant='h6' color='textSecondary'>
                  No classes here!
                </Typography>
                <Typography variant='subtitle1' color='textPrimary'>
                  Create a new class or join class.
                </Typography>
              </footer>
            </div>
          </Grid>
        )}
        {user.email ? (
          <FloatingButton
            text='Add Classroom'
            JoinClass={JoinClass}
            CreateClass={CreateClass}
          />
        ) : null}
      </Container>
    </div>
  );
}
