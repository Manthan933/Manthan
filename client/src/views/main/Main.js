import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import FloatingButton from "../../components/FloatingButtons/ClassButton";
import ClassCard from "../../components/ClassCard/ClassCard";
import { createClass, joinClass } from "../../actions/actions";
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { getClasses } from "../../actions/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  searchSection: {
    width: "79%",
    padding: "20px 27px",

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

  const [search, setSearch] = React.useState();
  const [searchError, setSearchError] = React.useState();
  const CreateClass = (newClass) => {
    createClass(newClass, user, Classes, setClasses);
  };

  const JoinClass = (classCode) => {
    console.log(classCode)
    joinClass(user, Classes, setClasses, classCode);
  };


  return (
    <Container className={classes.root}>
      <div className={classes.searchSection}>
        <TextField
          fullWidth
          error={!!searchError}
          helperText={searchError}
          className={classes.searchInput}
          type="text" value={search}
          onChange={(e) => getClasses(user.email, setClasses, e.target.value)}
          id="standard-basic"
          label="search class by subject name"
          variant="outlined" />



      </div>
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

  );
}
