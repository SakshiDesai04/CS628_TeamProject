import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  console.log(props.isLoggedin);
    if (props.isLoggedin===true)
    {
        return null;
    }
  return <button className="ui primary button" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;