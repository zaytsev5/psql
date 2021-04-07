
import * as express from 'express'
const redis = require('redis')

const fetch = require('node-fetch')
const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379
const client = redis.createClient(REDIS_PORT);

async function getPosts(req, res){
    console.log("fetching....");
    let baseURL = `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
    let data = await fetch(baseURL)
    let posts = await data.json()
    let user = req.params.user
   try {
    client.setex(user,3600,JSON.stringify(posts))
    res.json({posts})
   } catch (error) {
       console.log(error.message);
   }
    
}

async function cache(req, res, next){
    // console.log("mes");
   try {
    let user = req.params.user
    client.get(user, (err, data)=>{
        if(err) throw err;
        if(data){
           return res.json(JSON.parse(data))
        }
        next()
    })
   } catch (error) {
       console.log(error.message);
   }
}

app.get('/posts/:id/:user',cache,getPosts)

app.listen(PORT,()=>console.log('app listening port 5000'))
