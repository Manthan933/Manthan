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
import Chip from '@material-ui/core/Chip';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

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
    width: "-moz-available",
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
    margin: '10px'
  },
  chips: {
    margin: '5px',
  },
  edit: {
    margin: '5px',
    cursor: 'pointer',
    float: 'right',
    color: 'white'
  },
  close: {
    margin: '5px',
    cursor: 'pointer',
    float: 'right'
  }
});

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
      ): null }
            </div>
          </CardContent>
          {admin && <DeleteSweepIcon className={classes.edit} fontSize="large" onClick={() => setDisplayUsers(true)}/>}
        </Card>
        {displayUsers && 
            <div className={classes.list}>
              <Typography variant="h6" className={classes.title}>
                Delete Students from Class!
                <CloseIcon className={classes.close} onClick={() => setDisplayUsers(false)}/>
              </Typography>
              <div className={classes.demo}>
                  {Class?.users.map((value, index) => 
                    <Chip className={classes.chips}
                          key={index}
                          icon={<AccountCircleIcon />}
                          label={value}
                          onDelete={() => console.log('Deleted User ' + value)}
                          color="primary"
                    />
                  )}
                  <Chip className={classes.chips}
                        icon={<PeopleIcon />}
                        label="Delete All"
                        onDelete={() => console.log('Delete All Users')}
                        color="secondary"
                  />
              </div>
            </div>
        }
        {!displayUsers && Tests.map((Test) => {
          return <TestCard key={Test._id} Test={Test} />;
        })}

        {admin === "true" ? (
          <FloatingButton href={`/${Class.code}/`} text='Create Test' />
        ) : null}
      </Container>
    );
  else return null;
}
