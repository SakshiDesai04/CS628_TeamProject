import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import graphQLFetch from "./graphQLFetch";
import AddComment from "./AddComment";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";



function timeSinceDate(date) {

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

export default function BlogPostFunction() {
    const [data, dataSet] = useState(null);
    const [readyForRender, setReadyForRender] = useState(false);
    let params = useParams();

    const blogId = params.id;
    const { user, isAuthenticated } = useAuth0();
    let username = "Anonymous User";

    if(isAuthenticated)
    {
        username=user.email;
    }
    else{
        username="Anonymous User";
    }

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
        response = await response.GetBlog[0];
        dataSet(response)
        setReadyForRender(true);
      }
  
      fetchMyAPI()
    }, [])

    if(readyForRender){ return ( 
        <div className='ui container seattle3'>
        <Header/>
         <div class="ui items">
        {/* {JSON.stringify(data)} */}
        <div class="item">
  <div class="image">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYN387ZsZFDyz36RwA2W1Es06kYa7sQECrg&usqp=CAU"/>
  </div>
  <div class="content">
    <a class="header">{data.blogTitle}</a>
    <div class="meta">
      <span>Summary</span>
    </div>
    <div class="description">
      <p>{data.blogSummary}</p>
    </div>
    <div class="extra">
      Additional Details
    </div>
    <p>Posted by {data.username} {timeSinceDate(data.createdDate)} ago </p>
      <p>Last updated {timeSinceDate(data.modifiedDate)} ago</p>
  </div>
</div>
<AddComment blogId={data._id} username={username}/>
  </div>
  </div>); } else{ return null; }
}
