var  express = require('express');
var  app = express();
var axios = require('axios');
//var session = require('express-session');

app.post('/register', (req, res) => {

    axios.post('localhost:9000/createUser',{
        "username": req.body.username,
        "password": req.body.password
    })
    .then( response => {
        res.send(response.data);
        res.redirect('/home');
  })
    .catch(error => {
        console.log("ERROR");
        res.status(error.response.status).send(error.response.data.message)
    })
})

app.post('/login', (req, res) => {

    axios.post('localhost:9000/login',{
        "username": req.body.username,
        "password": req.body.password
    })
    .then(response => {
        res.send(response.data);
        res.redirect('/home');
    })
    .catch(error => {
        console.log("ERROR");
        res.status(error.response.status).send(error.response.data.message)
    })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("User service listening at http://%s:%s", host, port)
})