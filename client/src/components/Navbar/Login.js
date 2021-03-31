import React from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
const jwt = require('jsonwebtoken');



/**Age of the token in seconds*/
const mymaxAge = 1 * 24 * 60 * 60;
const createToken = (email, username, usertype) => {
    /**ًWhen this is released to production, 'Manthan Secret' should be not uploaded to public' */
    return jwt.sign({ email, username, usertype }, 'Manthan Secret', { expiresIn: mymaxAge });
}


export default function Login(props) {
  const { clientId, setAuth, setUser } = props;
  const login = (response) => {
    var profile = response.getBasicProfile();
    if (response.accessToken) {
      const user = {
        username: profile.getName(),
        email: profile.getEmail(),
        image: profile.getImageUrl(),
        userType : "user"
      };
      setUser(user);
      setAuth(true);
      const token = createToken(user.email , user.username , user.userType);
      const expireDate = new Date(Date.now() + mymaxAge * 1000);
      document.cookie = `jwt=${token}; expires=${expireDate}`;
    }
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };
  return (
    <GoogleLogin
      clientId={clientId}
      icon={false}
      buttonText='Login'
      onSuccess={login}
      onFailure={handleLoginFailure}
      responseType='code,token'
      isSignedIn={true}
      render={(renderProps) => (
        <Button data-testid='login-btn' color='inherit' onClick={renderProps.onClick}>
          Login
        </Button>
      )}
    />
  );
}
