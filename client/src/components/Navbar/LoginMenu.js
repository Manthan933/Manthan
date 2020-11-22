import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '928461249024-ugbiksni2621u5kv6vnq6ikrptdbjaah.apps.googleusercontent.com';

const useStyles = makeStyles((theme) => ({
  profileCard:{
    textAlign: "center",
    padding:0,
    paddingBottom:theme.spacing(1),
  },
  avatar: { 
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  name:{
    marginRight:theme.spacing(2),
    marginLeft:theme.spacing(2),
  },
  email:{
    margin:theme.spacing(2),
    marginTop: 0,
    fontWeight:"bolder",
  },
  button:{
    margin:theme.spacing(2),
    marginTop: 0,
    minWidth: "-moz-available",
    borderRadius: "50px",
    border: "solid 1px gray",
  },
  report:{
    paddingTop:theme.spacing(2),
    fontSize: "smaller",
    textDecoration:"none",
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(false);

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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    auth?
      <div>
        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          <Avatar/>
        </IconButton>
        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Container className ={classes.profileCard}>
            <Avatar className={classes.avatar} />
            <Typography className={classes.name}> Aavishkar Mishra </Typography>
            <Typography className={classes.email} > aavishkarMishtrazsdfsdfsdaf#</Typography>
            <GoogleLogout clientId={CLIENT_ID } icon = {false} buttonText='Login' onLogoutSuccess={ logout } onFailure={ handleLogoutFailure } render={renderProps => (<Button className={classes.button} onClick={renderProps.onClick} >Sign out</Button>)}/>
            <Divider/>
            <Typography className={classes.report} component="a" href="https://github.com/Manthan933/Manthan/issues/new/choose" color="textSecondary">Report an issue !</Typography>
          </Container>
        </Popover>
      </div>
      :
      <GoogleLogin clientId={ CLIENT_ID }  icon = {false} buttonText='Login' onSuccess={login } onFailure={ handleLoginFailure } responseType='code,token' isSignedIn={true} render={renderProps => (<Button color="inherit" onClick={renderProps.onClick} >Login</Button>)} />
  );
}
