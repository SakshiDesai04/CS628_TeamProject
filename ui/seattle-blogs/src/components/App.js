import {React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home';
import MyBlog from './MyBlog';
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
        <Route path='/updateBlog/:id' element={<UpdateBlog/>}/>
      </Routes>
  </Router>
  )
}

export default App;

