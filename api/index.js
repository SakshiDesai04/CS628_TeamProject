//include express module or package
const express = require('express');
const {GraphQLScalarType} = require('graphql');
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
//const dbase = require('./db');
const { ApolloServer, gql } = require('apollo-server-express');
const port = 4000;

// Connection URL
let db;
const url = 'mongodb://localhost';
const client = new MongoClient(url);

// Database Name
const dbName = 'cs628';

async function connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
  //const collection = db.collection('blogs');

  return 'done.';
}

connect()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

const GraphQLDate = new GraphQLScalarType(
    {
        name: 'GraphQLDate',
        description: 'A Date() type in GraphQL as a scalar',
        serialize(value){
            return value.toISOString();
        },
        parseValue(value){
            const dateValue = new Date(value);
            return isNaN(dateValue)? undefined: dateValue;

        },
        parseLiteral(ast){
            if (ast.kind == Kind.STRING){
            const value = new Date(ast.value);
            return isNaN(value)? undefined: value;
            }
        }
    }
);

// GraphQL's schema ‘Query’
const typeDefs = fs.readFileSync('./api/schema.graphql','utf-8');
// create resolver functions for Query schema
const resolvers = {
 Query: {
    GetBlogs: GetBlogs,
    GetComments: (_,{blogId})=>GetComments(blogId)
 },

 Mutation: {
     AddBlog,
     UpdateBlog,
     DeleteBlog,
     AddComment
 }
};
//Create instance of express
const app = express();
//Create an instance of Apollo Server 
const server = new ApolloServer({ typeDefs, resolvers });
//Apply the Apollo GraphQL middleware and set the path to /api
(async function(){
    await server.start();
    server.applyMiddleware({app,path:'/api'});
})();

app.get('/', (req, res) => res.send('Hello World'));
app.listen({ port }, () =>
 console.log(
 `Server running at http://localhost:${port}`
 )
);

async function AddBlog(_,{blog}){
    try{
        await client.connect();
        db = client.db(dbName);
        const collection =  db.collection('blogs');

        const val = { blogTitle: blog.blogTitle, blogSummary: blog.blogSummary,createdDate: new Date(), modifiedDate: new Date(), username:blog.username};
        const result = await collection.insertOne(val);
        console.log('Result of insert:\n',result.insertedId);

        const docs = await collection.find({_id: result.insertedId}).toArray();
        console.log('Result of find:\n', docs[0]);
        return docs[0];
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}

async function UpdateBlog(_,{blog}){
    try{
        await client.connect();
        db = client.db(dbName);
        const collection =  db.collection('blogs');
        const result = await collection.updateOne({_id:new ObjectId(blog._id)},{$set:{blogTitle: blog.blogTitle, blogSummary: blog.blogSummary, modifiedDate: new Date()}});

        const docs = await collection.find({_id: new ObjectId(blog._id)}).toArray();
        console.log('Result of find:\n', docs[0]);
        return docs[0];
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}

async function DeleteBlog(_,{id}){
    try{
        await client.connect();
        db = client.db(dbName);
        const collection =  db.collection('blogs');
        const result = await collection.deleteOne({_id:new ObjectId(id)});
        console.log(result);
        return "Deleted Successfully";
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}

async function GetBlogs(){
    try{
        await client.connect();
        db = client.db(dbName);
        const collection =  db.collection('blogs');
        const result = await collection.find().toArray();
        console.log('Result of find:\n', result);
        return result;
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}

async function GetComments(Id){
    try{
        await client.connect();
        db = client.db(dbName);
        const collection =  db.collection('comments');
        const result = await collection.find({blogId:Id}).toArray();
        console.log('Result of find:\n', result);
        return result;
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}

async function AddComment(_,{commentVal}){
    try{
        await client.connect();
        db = client.db(dbName);
        const collection =  db.collection('comments');

        const cmt = {blogId: commentVal.blogId,comment: commentVal.comment,createdDate: new Date(), username: commentVal.username};
        const result = await collection.insertOne(cmt);
        console.log('Result of insert:\n',result.insertedId);

        const docs = await collection.find({_id: result.insertedId}).toArray();
        console.log('Result of find:\n', docs[0]);
        return docs[0];
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}





