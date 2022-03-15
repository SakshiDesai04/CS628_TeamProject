import React from "react";
import graphQLFetch from "./graphQLFetch";
import userlogo from "../images/imageicon.jpeg";
import { Link } from "react-router-dom";

export default class BlogList extends React.Component {
  constructor() {
    super();
    this.state = { blogs: [] };
  }

  componentDidMount() {
    this.loadData();
  }

   timeSinceDate(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  async loadData() {
    const query = `
    query GetBlogs {
        GetBlogs {
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
    if (data) this.setState({ blogs: data.GetBlogs });
  }

  render() {
    const { blogs } = this.state;
    const blogsList = blogs.map(
      blog =>
      <div class="item">
  <i class="user icon"></i>
    <div class="content">
      <a class="header"><Link to={`/blogPost/${blog._id}`}><h3 style={{color:"black"}}>{blog.blogTitle}</h3></Link></a>
      <p></p>
      <div class="description" style={{color:"black"}}>Updated {this.timeSinceDate(blog.modifiedDate)} ago by  <a class="ui image label">
  <img src={userlogo}/>
  {blog.username}
  </a>
      </div>
    </div>
  </div>
    );

    return(
  
      <div style={{ overflow: 'scroll',
      height:"700px"}} class="ui relaxed divided list">
  {blogsList}
</div>

    );
  }
}



