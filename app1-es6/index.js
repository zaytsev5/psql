const typeorm = require('typeorm')
const Post = require('../app1-es6/model/Post')

typeorm.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [
        require("./entity/Post"),
    ]
}).then(async connection => {
    let post = new Post()
    post.title = 'this is title'
    post.text = 'this is text'
    let postReposity = connection.getRepository(Post)
    await postReposity.save(post)
    console.log("Post has been added.");
}).catch(e => console.log(e.message))