import React from "react";
import graphQLFetch from "./graphQLFetch";

class AddBlog extends React.Component{
state={
    blogTitle: "",
    blogSummary:"",
    username:this.props.username,
}

Add = (e)=>
{
    e.preventDefault();
    if(this.state.blogTitle==="" || this.state.blogSummary===""||this.state.username==="")
    {
        alert("*All fields are mandatory");
        return
    }

    this.AddData();
}

async AddData() {
    const query = `
    mutation {
        AddBlog(blog: {blogTitle:"${this.state.blogTitle}",
        blogSummary:"${this.state.blogSummary}",
        username:"${this.state.username}"
        }) {
          _id
          blogTitle
        }
      }
      `;
    const data = await graphQLFetch(query);
    if (data)
    {
        alert("Blog Added Successfully!");
        this.setState({blogTitle: "",
        blogSummary:"",
        username:this.props.username});
    };
  }

render(){
    return(
        <div className="ui main">
            <h2>Add Blog</h2>
            <form className="ui form" onSubmit={this.Add}>
            <div className="field">
            <label>Blog Title</label>
            <input type="text" name="blogTitle" value={this.state.blogTitle} placeholder="Blog Title" onChange={(e)=>{this.setState({blogTitle:e.target.value})}}></input>
            <label>Blog Summary</label>
            <input type="text" name="blogSummary" value={this.state.blogSummary} placeholder="Blog Summary" onChange={(e)=>{this.setState({blogSummary:e.target.value})}}></input>
            </div>
            <button className="ui button blue">Add Blog</button>
            </form>
        </div>
    );
}
}

export default AddBlog;
