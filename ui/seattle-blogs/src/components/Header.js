import React from "react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () =>{
    const { isAuthenticated } = useAuth0();
return(
    <div class="ui secondary  menu">
  <a class="item">
    <Link to="/" style={{color: 'black'}}><h3><u>Home</u></h3></Link>
  </a>
  <a class="item">
    <Link to="/myBlogs" style={{color: 'black'}}><h3><u>My Blogs</u></h3></Link>
  </a>
  <div class="right menu">
  <a class="item">
    <Profile/>
  </a>
 
    <a class="item">
    <LoginButton isLoggedin={isAuthenticated}/>
  </a>

    <a class="ui item">
    <LogoutButton/>
    </a>
  </div>
</div>
);
};
export default Header;

