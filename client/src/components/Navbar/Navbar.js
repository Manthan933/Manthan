import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Styles from "../../assets/jss/components/Navbar/NavbarStyles";
import Login from "./Login";
import Logout from "./Logout";

const CLIENT_ID = "928461249024-ugbiksni2621u5kv6vnq6ikrptdbjaah.apps.googleusercontent.com";

const useStyles = makeStyles(Styles);

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const [auth, setAuth] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, left: open });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Manthan
          </Typography>
          {auth ? (
            <Logout
              clientId={CLIENT_ID}
              user={props.user}
              setClasses={props.setClasses}
              setUser={props.setUser}
              setAuth={setAuth}
            />
          ) : (
            <Login
              clientId={CLIENT_ID}
              setUser={props.setUser}
              setAuth={setAuth}
            />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.list}
        open={state["left"]}
        onClose={toggleDrawer(false)}
        role="presentation"
      >
        <List className={classes.list}>
          <ListItem button component="a" href="/">
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List
          component="nav"
          aria-labelledby="list-subheader"
          subheader={
            <ListSubheader component="div" id="list-subheader">
              {" "}
              Enrolled{" "}
            </ListSubheader>
          }
        >
          {props.Classes.map((Class) => {
            return (
              <ListItem
                key={Class._id}
                className={classes.classLink}
                component="a"
                href={`/${Class._id}`}
              >
                <ListItemIcon>
                  <ClassRoundedIcon />
                </ListItemIcon>
                <ListItemText color="textPrimary">{Class.name}</ListItemText>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </ListItem>
          <ListItem
            button
            component="a"
            href="https://github.com/Manthan933/Manthan"
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText>GitHub</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
