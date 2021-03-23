import React from "react";
import FacebookLogin from "react-facebook-login";
const jwt = require('jsonwebtoken');




/**Age of the token in seconds*/
const mymaxAge = 1 * 24 * 60 * 60;
const createToken = (email, username, usertype) => {
    /**ًWhen this is released to production, 'Manthan Secret' should be not uploaded to public' */
    return jwt.sign({ email, username, usertype }, 'Manthan Secret', { expiresIn: mymaxAge });
}



export default function LoginFacebook(props) {
  const { appId, setAuth, setUser } = props;

  const responseFacebook = response => {
    if (response.accessToken) {
      const user = {
        username: response.name,
        email: response.email,
        image: response.picture.data.url,
        userType : "user"
      };
      localStorage.setItem("user", JSON.stringify({ user }));
      setUser(user);
      setAuth(true);
      const token = createToken(user.email , user.username , user.userType);
      const expireDate = new Date(Date.now() + mymaxAge * 1000);
      document.cookie = `jwt=${token}; expires=${expireDate}`;

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
