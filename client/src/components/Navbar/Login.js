import React from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";

export default function Login(props) {
  const login = (response) => {
    var profile = response.getBasicProfile();
    if (response.accessToken) {
      const user = {
        username: profile.getName(),
        email: profile.getEmail(),
        image: profile.getImageUrl(),
      };
      props.setUser(user);
      props.setAuth(true);
    }
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };
  return (
    <GoogleLogin
      clientId={props.clientId}
      icon={false}
      buttonText='Login'
      onSuccess={login}
      onFailure={handleLoginFailure}
      responseType='code,token'
      isSignedIn={true}
      render={(renderProps) => (
        <Button color='inherit' onClick={renderProps.onClick}>
          Login
        </Button>
      )}
    />
  );
}
