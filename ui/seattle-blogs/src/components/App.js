import {React, Component } from 'react';
import Header from "./Header";
import BlogList from "./BlogList";
import Profile from "./Profile";
import AddBlog from "./AddBlog";
import { BrowserRouter as Router, Route, Link, Routes, Outlet, useParams } from 'react-router-dom'
import Home from './Home';
import BlogPost from './BlogPost';
import MyBlog from './MyBlog';
import BlogSummary from './BlogSummary';
import AddNewBlog from './AddNewBlog';
import UpdateBlog from './UpdateBlog';
import BlogPostFunction from './BlogPostFunction';

 


function App()
{ 
  return( 
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/blogs' element={<Home />}/>
        {/* <Route path='/blogPost' element={<BlogSummary />}/> */}
        <Route path='/myBlogs' element={<MyBlog />}/>
        <Route path='/addBlog' element={<AddNewBlog />}/>
        <Route path='/update' element={<UpdateBlog />}/>
        <Route path='/blogPost/:id' element={<BlogPostFunction />}/>
      </Routes>
  </Router>
  )
}

export default App;

