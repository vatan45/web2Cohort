const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomvatanmalik'
// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];


// Example route
app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    function generateToken() {
        return Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
    }
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)
        // foundUser.token = token;
        res.json({ token: token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log(users)
});

//shoukd returnb a long stirng 

function generateToken() {
    Math.random();
}

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    });
    res.json({
        message: "you are signed in"
    });
    console.log(users);
});

// Move the following route and listen function outside of the signup route
app.get('/me', (req, res) => {
    const token = req.headers.token;   //jwt
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username
    if (username) {
        res.json(username);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



