var  express = require('express');
var  app = express();
var axios = require('axios');
app.use(express.json())
var session = require('express-session');

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Language", "th")
  next();
});

app.post('/delete', (req, res) => {
    const payload = req.body
    axios.post('http://localhost:9000/deleteUser',{
        "username": payload.username,
    })
    .then( response => {
        res.send(response.data);
        res.redirect('/');
    })
    .catch(error => {
        let response = error.response
        console.log(response.status);
        res.status(response.status).send(response.data)
    })
})

app.post('/register', (req, res) => {
    const payload = req.body
    axios.post('http://localhost:9000/createUser',{
        "username": payload.username,
        "password": payload.password
    })
    .then( response => {
        res.send(response.data);
        res.redirect('/');
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

app.listen(process.env.PORT, () => {
    console.log('Started User service at port ' + process.env.PORT)
    registerService(process.env.PORT)
})


function registerService(servicePort){
    console.log(servicePort)
    axios.post('http://localhost:3000/addService',{
        servicePort : servicePort,
        serviceNumber : 1
    })
        .then(response => {
            console.log('register Service SuccessFully')
        })
        .catch(error => {
            console.log('Connot RegisterService')
        })
}
