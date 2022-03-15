import React from "react";
import graphQLFetch from "./graphQLFetch";

class AddComment extends React.Component{
state={
    comments:[]
}

async GetComments(id) {
    const query = `
    query {
        GetComments(blogId: "${id}") {
          _id
          blogId
          comment
          createdDate
          username
        }
      }
      `;
    const data = await graphQLFetch(query);
    if (data) this.setState({ comments: data.GetComments });
  }

  componentDidMount() {
    this.GetComments(this.props.blogId);
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


async AddComment() {
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
   const {comments} = this.state; 
    let commentList = comments.map((comment)=>
        <div class="event">
    <div class="label">
    <i class="reddit icon"></i>
    </div>
    <div class="content">
      <div class="summary">
          {comment.username}
      </div>
      <div>
          commented <b>"{comment.comment}"</b>
      </div>
      <div class="date">
          {this.timeSinceDate(comment.createdDate)} ago
        </div>
    </div>
  </div>
    );
    return(
        <div>
            <div class="ui feed">
                <div>
                    <h3>Commnet Feed</h3>
                </div>
                <div class="ui divider"></div>
            {commentList}
            </div>
        
        <div class="ui fluid action input">
        <input type="text" placeholder="Comment..."/>
        <button class="ui button">Post</button>
        </div>
        </div>
    );
}
}

export default AddComment;


