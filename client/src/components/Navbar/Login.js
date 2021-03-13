import React from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";

export default function Login(props) {
  const { clientId, setAuth, setUser } = props;
  const login = (response) => {
    var profile = response.getBasicProfile();
    if (response.accessToken) {
      const user = {
        username: profile.getName(),
        email: profile.getEmail(),
        image: profile.getImageUrl(),
      };
      setUser(user);
      setAuth(true);
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
