var  express = require('express');
var  app = express();
var axios = require('axios');
app.use(express.json())
//var session = require('express-session');

app.use(express.json())

app.post('/register', (req, res) => {
    const payload = req.body
    axios.post('http://localhost:9000/createUser',{
        "username": payload.username,
        "password": payload.password
    })
    .then( response => {
        res.send(response.body);
        res.redirect('/home');
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.post('/login', (req, res) => {
    const payload = req.body
    axios.post('http://localhost:9000/login',{
        "username": payload.username,
        "password": payload.password
    })
    .then(response => {
        res.send(response.data);
        res.redirect('/home');
    })
    .catch(error => {
        res.status(error.response.status).send(error.response.data)
    })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("User service listening at http://%s:%s", host, port)
})
