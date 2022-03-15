import {React, Component } from 'react';
import Header from "./Header";
import BlogList from "./BlogList";
import Profile from "./Profile";
import AddBlog from "./AddBlog";
import MyBlogs from './MyBlogs';
import { useAuth0 } from "@auth0/auth0-react";
import BlogPost from './BlogPost';

export default function BlogSummary() {

return(
    <div className='ui container seattle3'>
    <Header/>
    <BlogPost/>
  </div> 
);
}
