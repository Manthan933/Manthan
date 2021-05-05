import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './Forget.css';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from '../../actions/auth';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  footer: {
    position: 'fixed',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '35px',
    backgroundColor:'rgba(0, 0, 0, 0.952)',
    bottom: '0px',
    left: '0',
    width: '100%',
    overflowY: 'hidden',
  },
  footerp: {
    textAlign: 'center',
    justifyContent: 'center',
    color:'rgb(255, 255, 255)',
    fontSize: '13px',
    opacity: '0.8',
   
  },
  link: {
    color: 'white',
  }
}));

const Login = ({ login,  loading }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
      <>
      <br></br>
    <Container component="main" maxWidth="xs" className="box">
      <CssBaseline />
      <div className={classes.paper}>
          <br></br>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forget Password
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChange}
            minLength="6"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              classes: {
                adornedEnd: classes.adornedEnd
              }
            }}
          />
          <TextField 
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirm password"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            minLength="6"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Submit
          </Button>
          
        </form>
      </div>
      <div className={classes.footer}>
        <p className={classes.footerp}>
      All rights reserved. Copyright ©  <Link className={classes.link} to="http://www.manthan-app.org/">
          Manthan
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </p>
      </div>
    </Container>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { login })(Login);
