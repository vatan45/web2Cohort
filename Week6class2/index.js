const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const JWT_SECRET = 'secretkey123';


const port = 3000;
const users = [];


app.post('/signup', (req, res) => {

    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "you are signed in"
    })
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "credentials Incorrect"
        })
        return
    } else {
        const token = jwt.sign({
            username
        }.JWT_SECRET)
        res.json({
            token: token
        })
    }
});

app.get('/me', (req, res) => {
    // TO DO: implement me logic
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

