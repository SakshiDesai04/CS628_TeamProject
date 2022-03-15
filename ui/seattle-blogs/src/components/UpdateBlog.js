import React from "react";
import graphQLFetch from "./graphQLFetch";
import Header from "./Header";

function UpdateBlog(){
    return(
        <>
        <Header/>
        <div className="ui main">
            <h2>Update Blog</h2>
            <form className="ui form" onSubmit={this.Update}>
            <div className="field">
            <label>Blog Title</label>
            <input type="text" name="blogTitle" value={this.state.blogTitle} placeholder="Blog Title" onChange={(e)=>{this.setState({blogTitle:e.target.value})}}></input>
            <label>Blog Summary</label>
            <input type="text" name="blogSummary" value={this.state.blogSummary} placeholder="Blog Summary" onChange={(e)=>{this.setState({blogSummary:e.target.value})}}></input>
            </div>
            <button className="ui button blue">Update</button>
            </form>
        </div>
        </>
    );
}

export default UpdateBlog;
