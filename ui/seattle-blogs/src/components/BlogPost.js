import React from "react";
import AddComment from "./AddComment";
import graphQLFetch from "./graphQLFetch";



class BlogPost extends React.Component {
    constructor() {
        super();
        this.state = { blog :[]};
        /* this.wallpapers = [
            {
                0:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYN387ZsZFDyz36RwA2W1Es06kYa7sQECrg&usqp=CAU"
            },
            {
                1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe2iSLuySeyQvbc7FZWz8mbLzGS2iFbaJC6w&usqp=CAU"
            },
            {
                2:"https://c4.wallpaperflare.com/wallpaper/465/308/900/seattle-at-night-from-the-space-needle-hdr-wallpaper-preview.jpg"
            },
            {
                3:"https://www.cashadvance6online.com/data/archive/img/3068163749.jpeg"
            },
            {
                4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7mnOwYjrZ_5zdgLPJ1nplONO-Gp8pF_GAQ&usqp=CAU"
            },
            {
                5:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT13kPiFpqbMqTSksp4R4rWahlGy2aTlZ9BLA&usqp=CAU"
            }
        ]; */
        this.blogID="";
      }

    
    componentDidMount() {
     
            let queryParams = new URLSearchParams(window.location.search);
            const id = queryParams.get('blogid');
            this.blogID =id;
            this.getData();

            /* this.queryParams = new URLSearchParams(window.location.search);
            const id = this.queryParams.get('blogid');
            this.blogID =id;
            this.getData(); */
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
