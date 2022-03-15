/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AddComment from "./AddComment";
import graphQLFetch from "./graphQLFetch";



class BlogPost extends React.Component {
    constructor() {
        super();
        this.state = { blog :[]};
        this.blogID="";
      }

    
    componentDidMount() {
     
            let queryParams = new URLSearchParams(window.location.search);
            const id = queryParams.get('blogid');
            this.blogID =id;
            this.getData();
      }

    async getData()
    {
        
    await new Promise(resolve => setTimeout(resolve, 700));
    const query =`query {
        GetBlog(blogId: "${this.blogID}") {
          _id
          blogTitle
          blogSummary
          createdDate
          modifiedDate
          username
        }
      }`;

      const data = await graphQLFetch(query);
      if (data) this.setState({ blog: data.GetBlog[0] });  
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

    render(){
        const blog = this.state.blog;
        const item = (<div class="item">
        <div class="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYN387ZsZFDyz36RwA2W1Es06kYa7sQECrg&usqp=CAU"/>
        </div>
        <div class="content">
          <a class="header">{blog.blogTitle}</a>
          <div class="meta">
            <span>Summary</span>
          </div>
          <div class="description">
            <p>{blog.blogSummary}</p>
          </div>
          <div class="extra">
            Additional Details
          </div>
          <p>Posted by {blog.username} {this.timeSinceDate(blog.createdDate)} ago </p>
            <p>Last updated {this.timeSinceDate(blog.modifiedDate)} ago</p>
        </div>
      </div>)
        return <div class="ui items">
        {item}
        <AddComment blogId={blog._id}/>
      </div>;
    }
}
export default BlogPost;
