import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import image from "../../assets/images/5.jpg";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteClass } from "../../actions/actions";
import CreateClass from "../Froms/CreateClass";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    minHeight: 220,
    maxHeight: 220,
    minWidth: 300,
    margin: theme.spacing(2),
    borderRadius: "5px",
    background: "linear-gradient(225deg, #e6e6e6, #ffffff)",
    boxShadow: "-5px 5px 10px #b3b3b3, 5px -5px 10px #ffffff",
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  pos: {
    paddingTop: theme.spacing(2),
    color: "white",
  },
  body: {
    backgroundImage: `url(` + image + `)`,
    backgroundColor: "#00000070",
    backgroundBlendMode: "darken",
    padding: theme.spacing(3),
    paddingBottom: 0,
  },
  content: {
    padding: 0,
    position: "relative",
  },
  details: {
    padding: theme.spacing(2),
  },
  avatar: {
    position: "absolute",
    top: theme.spacing(7),
    height: theme.spacing(10),
    width: theme.spacing(10),
    right: theme.spacing(2),
  },
  delete: {
      float: 'right',
      marginRight:'15px',
      marginTop: '-20px',
      cursor: 'pointer',
  },
  edit: {
    paddingLeft: '5px',
    cursor: 'pointer',
}
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const { Class, admin, setClasses, UpdateClass} = props;
  const [editClass, setEditClass] = React.useState(false);

  const handleCardEditing = () => {
    setEditClass(true);
  };

  return (
    <>
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.body}>
          <Typography
            className={classes.title}
            variant='h5'
            component='a'
            href={`/${Class.code}/${admin}`}
            gutterBottom
            color='textPrimary'
          >
            {Class.name}
          </Typography>
          <EditIcon color='action' fontSize="small" className={classes.edit} onClick={handleCardEditing}/>
          <Typography className={classes.pos} color='textSecondary'>
            {Class.instructor.name}
          </Typography>
        </div>
        <Avatar className={classes.avatar} src={Class.image} />
        <div className={classes.details}>
          <Typography variant='body1' component='p'>
            Subject: {Class.subject}
          </Typography>
          <Typography variant='body1' component='p'>
            Subject Code: {Class.subcode}
          </Typography>
          <Typography variant='body1' component='p'>
            Class Code: {Class.code}
          </Typography>
        </div>
        <DeleteIcon color='error' className={classes.delete} onClick={() => deleteClass(Class.code, Class.instructor?.email, setClasses)}/>
      </CardContent>
    </Card>
     <CreateClass open={editClass} setOpen={setEditClass} classDetails={Class} updateClass={UpdateClass} editable={true}/>
  </>
  );
}
