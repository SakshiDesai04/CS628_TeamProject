import {React, Component } from 'react';
import Header from "./Header";
import AddBlog from "./AddBlog";
import { useAuth0 } from "@auth0/auth0-react";

export default function AddNewBlog() {
  const {isAuthenticated, user} =  useAuth0();
  let userEmail = "";
  if(isAuthenticated)
  {
      userEmail=user.email;
  }
return(
    <div className='ui container seattle3'>
    <Header/>
    <div class="ui divider"></div>
    <AddBlog username={userEmail}/>
  </div> 
);
}

