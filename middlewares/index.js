const express = require('express');
const app = express();

let requestCount = 0;


//middleware function

function loggermiddleware(req, res, next) {
    console.log("Methos is:" + req.method);;
    console.log("hsot is:" + req.url);
    console.log(new Date());

    next();
}
app.use(loggermiddleware);


app.get('/sum', function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a + b
    })

})

app.get('/multiply', function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })

})

app.get('/subtract', function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a - b
    })
})

app.get('/divide', function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })
})

app.listen(3000);