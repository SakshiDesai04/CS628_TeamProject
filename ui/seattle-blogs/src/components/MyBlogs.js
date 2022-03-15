import React from "react";
import graphQLFetch from "./graphQLFetch";
import { Link } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';




export default class MyBlogs extends React.Component {
  constructor() {
    super();
    this.state = { blogs: [] };
    this.Delete = this.Delete.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `
    query {
        GetBlogsByUser(username: "veerendra1608@gmail.com") {
          _id
                blogTitle
                blogSummary
                createdDate
                modifiedDate
                username
        }
      }
      `;
    const data = await graphQLFetch(query);
    if (data) this.setState({ blogs: data.GetBlogsByUser });
  }

  async DeleteData(id) {
    const query = `
    mutation {
        DeleteBlog(id: "${id}")
      }
      `;
    const data = await graphQLFetch(query);
    if (data){
       this.loadData(); 
    };
  }

  Delete(id)
  {    
      this.DeleteData(id);
  }



  render() {
    const { blogs } = this.state;
    const blogsList = blogs.map(
      blog => <tr>
      <td>
      <i class="thumbtack icon"></i>
        <Link to={`/blogPost/${blog._id}`}><h2>{blog.blogTitle}</h2></Link>
      </td>
      <td>
      <a class="ui blue image label">
  <div class="detail">{blog.createdDate.toString()}</div>
      </a>
      </td>
      <td>
      <a class="ui blue image label">
  <div class="detail">{blog.modifiedDate.toString()}</div>
      </a>
      </td>
      <td>
      <div>
      <Link to={`/updateBlog/${blog._id}`}><i className="edit icon"></i></Link>
      <i onClick={(e)=>{this.Delete(blog._id)}} className="trash alternate outline icon" style={{color:"red", marginTop:"7px"}}></i>
      </div>
      </td>
    </tr>
    );


    if (this.props.isLoggedin===false)
    {
        return <div style={{color:"red"}}>
            **Please Log In
        </div>;
    }

    return(
      <div style={{ overflow: 'scroll',
      height:"700px"}}>
          <div className="ui inverted segemnt">
            <button style={{float: "right"}} className="ui inverted green button"><Link style={{color:"Black"}} to="/addBlog">Add Blog</Link></button>
          </div>
          
          
      <table class="ui selectable inverted table">
      <thead>
        <tr>
          <th><h4>Blog Title</h4></th>
          <th><h4>Created</h4></th>
          <th><h4>Updated</h4></th>
          <th></th>
      </tr>
      </thead>
      <tbody>
        {blogsList}
      </tbody>
    </table>
    </div>
    );
  }
}
