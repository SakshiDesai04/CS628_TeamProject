import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import graphQLFetch from "./graphQLFetch";
import Header from "./Header";


export default function UpdateBlog() {
    const [data, dataSet] = useState(null);
    const [blogTitle, SetBlogTitle] = useState("");
    const [blogSummary, SetBlogSummary] = useState("");
    const [readyForRender, setReadyForRender] = useState(false);
    let params = useParams();

    const blogId = params.id;

    useEffect(() => {
      async function fetchMyAPI() {
        const query =`query {
            GetBlog(blogId: "${blogId}") {
              _id
              blogTitle
              blogSummary
              createdDate
              modifiedDate
              username
            }
          }`;
        
        let response = await graphQLFetch(query);
        let responsedata =  await response.GetBlog[0];
        dataSet(responsedata)
        if(responsedata)
        {
        console.log(responsedata);
        SetBlogTitle(responsedata.blogTitle);
        SetBlogSummary(responsedata.blogSummary);
        setReadyForRender(true);
        }
      }
  
      fetchMyAPI()
    }, [])

    const Update = (e) =>{
        e.preventDefault();
        UpdatedBlog({id:blogId,title:blogTitle,summary:blogSummary});
    }

    if(readyForRender){ return ( 
        <div className='ui container seattle3'>
        <Header/>
        <h2>Update Blog</h2>
            <form className="ui form" onSubmit={Update}>
            <div className="field">
            <label>Blog Title</label>
            <input type="text" name="blogTitle" value={blogTitle} placeholder="Blog Title" onChange={(e)=>{SetBlogTitle(e.target.value);}}></input>
            <label>Blog Summary</label>
            <input type="text" name="blogSummary" value={blogSummary} placeholder="Blog Summary" onChange={(e)=>{SetBlogSummary(e.target.value);}}></input>
            </div>
            <button className="ui button blue">Update</button>
            </form>

        </div>); 
        } else
        { return null; 
        }
}

async function UpdatedBlog(blog)
{ 
            const query =`mutation {
                UpdateBlog(blog: {
                  _id:"${blog.id}"
                  blogTitle:"${blog.title}"
                  blogSummary:"${blog.summary}"
                }) {
                  blogTitle
                  blogSummary
                }
              }`;
          
          let response = await graphQLFetch(query);
          let responsedata =  await response;
        alert("Updated Successfully!");
}
