import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import image from "../../assets/images/1.jpg";
import FloatingButton from "../../components/FloatingButtons/TestButton";
import { getClass, getTests } from "../../actions/actions";
import TestCard from "../../components/TestCard/TestCard";
import Chip from "@material-ui/core/Chip";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@material-ui/core/Button';
import { removeStudents, removeTest } from "../../actions/actions";

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    minHeight: "200px",
    backgroundImage: `url(` + image + `)`,
    backgroundColor: "#00000060",
    backgroundBlendMode: "darken",
    backgroundSize: "cover",
    marginTop: 20,
  },

  content: {
    display: "inline-flex",
    width: "90%",

  },
  generate: {
    display: "flex",

  },
  copylink: {
    outline: "none",
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "white",
    border: "none",
    borderRadius: "5px",
    padding: "3px 10px",
    color: "black",
    fontFamily: "Open Sans",

    letterSpacing: "1px",
    textDecoration: "none",
    margin: "auto 0",
    cursor: "pointer",

  },
  link: {

    fontFamily: "Open Sans",

    letterSpacing: "1px",
    textDecoration: "none",
    margin: "auto 20px",
    cursor: "pointer",

  },
  details: {
    flexGrow: " 1",
    marginInlineStart: "1.5%",
    color: "white",
  },
  avatar: {
    background: "#4285f4",
  },

  list: {
    margin: "10px",
  },
  chips: {
    margin: "5px",
  },
  edit: {
    margin: "5px",
    cursor: "pointer",
    float: "right",
    color: "white",
  },
  close: {
    margin: "5px",
    cursor: "pointer",
    float: "right",
  },
});

const onLinkClick = (code) => {
  navigator.clipboard.writeText(`${window.location.origin}/join/${code}`)
  alert("link copied");
}
export default function Classroom(props) {

  const classes = useStyles();
  const { classCode, admin } = props.match.params;
  const [Tests, setTests] = React.useState([]);
  const [Class, setClass] = React.useState();
  const [displayUsers, setDisplayUsers] = React.useState(false);

  React.useEffect(() => {
    getClass(classCode, setClass);
  }, [classCode]);
  React.useEffect(() => {
    getTests(classCode, setTests);
  }, [classCode]);
  function onDelete(id) {
    removeTest(id);
    getTests(classCode, setTests);
  }
  if (Class)
    return (
      <Container>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <div className={classes.details}>
              <Typography variant='h3'>{Class.name}</Typography>
              <Typography variant='subtitle1'>{Class.subject}</Typography>

              <Typography variant='subtitle1'>
                Instructor : {Class.instructor.name}
              </Typography>

              {admin === "true" ? (
                <Typography variant='subtitle1'>
                  Class code : {Class.code}
                </Typography>
              ) : null}
              <br />
              <div style={{ display: "flex" }}>
                {/* <p className={classes.copylink} onClick={() => onLinkClick(Class.code)}>Copy Class Link</p> */}
                <button className={classes.copylink} onClick={() => onLinkClick(Class.code)} variant="contained">copy link</button>
                <p className={classes.link} >{window.location.origin}/join/{Class.code}</p>
              </div>






            </div>
          </CardContent>
          {admin === "true" && (
            <DeleteSweepIcon
              className={classes.edit}
              fontSize='large'
              onClick={() => setDisplayUsers(true)}
            />
          )}
        </Card>
        {displayUsers && (
          <div className={classes.list}>
            <Typography variant='h6' className={classes.title}>
              {Class?.users.length <= 1
                ? "No Student enrolled in class or already removed!"
                : "Delete Students from Class!"}
              <CloseIcon
                className={classes.close}
                onClick={() => setDisplayUsers(false)}
              />
            </Typography>
            <div className={classes.demo}>
              {Class.users.map((value, index) => {
                return (
                  Class.instructor.email !== value && (
                    <Chip
                      className={classes.chips}
                      key={index}
                      icon={<AccountCircleIcon />}
                      label={value}
                      onDelete={() =>
                        removeStudents(
                          classCode,
                          value,
                          Class.instructor,
                          false,
                          setClass
                        )
                      }
                      color='primary'
                    />
                  )
                );
              })}
              {Class.users.length > 2 && (
                <Chip
                  className={classes.chips}
                  icon={<PeopleIcon />}
                  label='Delete All'
                  onDelete={() =>
                    removeStudents(
                      classCode,
                      Class.users,
                      Class.instructor,
                      true,
                      setClass
                    )
                  }
                  color='secondary'
                />
              )}
            </div>
          </div>
        )}
        {!displayUsers &&
          Tests.map((Test) => {
            return <TestCard key={Test._id} id={Test.id} Test={Test} admin={admin} onDelete={onDelete} />;
          })}

        {admin === "true" ? (
          <FloatingButton href={`/${Class.code}/`} text='Create Test' />
        ) : null}
      </Container>
    );
  else return null;
}
