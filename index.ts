
import {createConnection} from "typeorm";
import {User} from "./src/entity/User";

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000

app.post('/add', (req, res) => {
    createConnection()
     .then(async connection=> {
        let user = new User()
        // user.firstName = 'nguyenvan'
        // user.lastName = 'hai'
        // user.age =  23
        user = req.body
        let userReposity = connection.getRepository(User)
        await userReposity.save(user)
        console.log("Post has been added.");
        return res.status(200).json({msg: 'OK'})
     })
    .catch(e => res.json({msg: e.message}))
    // res.status(200).send('Hello world...')
})

app.use(function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
})

app.listen(PORT, () => console.log('Server running on port 3000'))