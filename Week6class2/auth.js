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
        }, JWT_SECRET) // Fixed: Added a comma to separate the payload and secret
        res.json({
            token: token
        })
    }
});


function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.username) {
        req.username = decodedData.username;
        next()
    } else {
        res.json({
            message: "you are not logged in"

        })
    }
}



app.get('/me', auth, (req, res) => {

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == decodedData.username) {
            foundUser = users[i]
        }
    }
    res.json({
        username: foundUser.username,
        password: foundUser.password
    })



});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

