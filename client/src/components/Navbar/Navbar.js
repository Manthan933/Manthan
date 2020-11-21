import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import Styles from '../../assets/jss/components/Navbar/NavbarStyles';


const useStyles = makeStyles(Styles);

const CLIENT_ID = '928461249024-ugbiksni2621u5kv6vnq6ikrptdbjaah.apps.googleusercontent.com';

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({left: false});
  const [openlist, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!openlist);
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: open });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const login = (response) => {
    var profile = response.getBasicProfile();
    if(response.accessToken){
      setAuth(true);
    }
  };
  const logout = () => {
    setAuth(false);
  };
  const handleLoginFailure = (response)=>{
    alert('Failed to log in')
  };
  const handleLogoutFailure = (response)=> {
    alert('Failed to log out')
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>Manthan</Typography>
          {auth ?
            <div>
              <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <Avatar>H</Avatar>
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={open} onClose={handleClose} >
                <CardContent>
                  <Typography className={classes.cardtitle}>
                    Signed in as 
                  </Typography>
                  <Typography className={classes.pos}>
                    {'name'}
                  </Typography>
                </CardContent>
                <CardActions className={classes.menuButton} >
                <GoogleLogout clientId={ CLIENT_ID } buttonText='Logout' onLogoutSuccess={ logout } onFailure={ handleLogoutFailure }/>
                </CardActions>    
              </Menu>
            </div>
            :
            <div>
              <GoogleLogin clientId={ CLIENT_ID } buttonText='Login' onSuccess={login } onFailure={ handleLoginFailure } responseType='code,token' isSignedIn={true}/>
            </div>
          }
        </Toolbar>
      </AppBar>
      <Drawer className={classes.list} open={state['left']} onClose={toggleDrawer(false)} role="presentation">
        <List  className={classes.list}t>
          <ListItem button component='a' href = '/' >
            <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-labelledby="nested-list-subheader" subheader={<ListSubheader component="div" id="nested-list-subheader"> Enrolled </ListSubheader>}>
          <ListItem button onClick={handleClick}>
            <ListItemIcon><ClassRoundedIcon/></ListItemIcon>
            <ListItemText primary="Classroom" />
            {openlist ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openlist} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><SettingsRoundedIcon /></ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </ListItem>
          <ListItem button component='a' href = 'https://github.com/Manthan933/Manthan'>
            <ListItemIcon><GitHubIcon /></ListItemIcon>
            <ListItemText>GitHub</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
