import React, { useEffect } from "react";
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
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Login from "./Login";
import Logout from "./Logout";
import LoginFacebook from "./LoginFacebook";

const CLIENTcode = "928461249024-ugbiksni2621u5kv6vnq6ikrptdbjaah.apps.googleusercontent.com";
const APPID = "190043079194136"; // Go to developers.facebook.com create an account and enter the app ID here.

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    float: "right",
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  cardtitle: {
    fontSize: 14,
    width: 150,
  },
  pos: {
    fontWeight: "bolder",
  },
  menu: {
    top: 50,
  },
  classLink: {
    color: "inherit",
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const [auth, setAuth] = React.useState(false);
  const { Classes, setClasses, user, setUser } = props;

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser !== null) {
      setUser(isUser.user);
      setAuth(true);
    }
  }, []);

  const toggleDrawer = open => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, left: open });
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar color="inherit">
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
                clientId={CLIENTcode}
                user={user}
                setClasses={setClasses}
                setUser={setUser}
                setAuth={setAuth}
              />
            ) : (
              <>
                <Login clientId={CLIENTcode} setUser={setUser} setAuth={setAuth} />
                <LoginFacebook appId={APPID} setUser={setUser} setAuth={setAuth} />
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Divider />
      <Drawer className={classes.list} open={state["left"]} onClose={toggleDrawer(false)} role="presentation">

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
          style={{ marginLeft: "0.2rem" }}
        >
          {Classes.length &&
            Classes.map(Class => {
              return (
                <ListItem
                  key={Class.code}
                  className={classes.classLink}
                  component="a"
                  style={{
                    backgroundColor: localStorage.getItem('activeClass') == Class.code ? "grey" : "white",
                    color: localStorage.getItem('activeClass') == Class.code ? "white" : "black"
                  }}
                  href={`/${Class.code}/${user.email === Class.instructor.email}`}
                >
                  <ListItemIcon>
                    <ClassRoundedIcon />
                  </ListItemIcon>
                  <ListItemText color="textPrimary"> {truncate(Class.name, 12)}</ListItemText>
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
          <ListItem button component="a" href="https://github.com/Manthan933/Manthan">
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
