import {React, Component } from 'react';
import Header from "./Header";
import BlogList from "./BlogList";
import Profile from "./Profile";
import AddBlog from "./AddBlog";
import MyBlogs from './MyBlogs';
import { useAuth0 } from "@auth0/auth0-react";

export default function MyBlog() {
const {isAuthenticated, user} =  useAuth0();
let userEmail = "";
if(isAuthenticated)
{
    userEmail=user.email;
}
return(
    <div className='ui container seattle2'>
    <Header/>
    <div class="ui divider"></div>
    <MyBlogs isLoggedin={isAuthenticated} username={userEmail}/>
  </div> 
);
}
