import {React, Component } from 'react';
import Header from "./Header";
import BlogList from "./BlogList";
import Profile from "./Profile";
import AddBlog from "./AddBlog";


export default function Home() {

return(
    <div className='ui container seattle'>
    <Header/>
    <div class="ui divider"></div>
    <BlogList/>
  </div> 
);
}

