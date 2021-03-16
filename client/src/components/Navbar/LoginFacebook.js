import React from "react";
import FacebookLogin from "react-facebook-login";

export default function LoginFacebook(props) {
  const { appId, setAuth, setUser } = props;

  const responseFacebook = response => {
    if (response.accessToken) {
      const user = {
        username: response.name,
        email: response.email,
        image: response.picture.data.url,
      };
      localStorage.setItem("user", JSON.stringify({ user }));
      setUser(user);
      setAuth(true);
    } else {
      alert("Failed to log in");
    }
  };

  return (
    <FacebookLogin
      appId={appId}
      size="small"
      textButton="LOGIN"
      fields="name,email,picture"
      icon="fa-facebook"
      callback={responseFacebook}
      cookie={true}
    />
  );
}
