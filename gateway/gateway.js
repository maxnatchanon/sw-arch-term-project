const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

var port = 8082

app.get('/problem', (req, res) => {
	console.log('Call Problem service: executing /problem')
    axios.get('http://localhost:'+port+'/createUser')
    .then( response => {
        res.send(response.body);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.get('/checkResult', (req, res) => {
	console.log('Call Problem service: executing /checkResult')
    axios.get('http://localhost:'+port+'/checkResult')
    .then( response => {
        res.send(response.body);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.post('/register', (req, res) => {
	console.log('Call User service: executing /register')
	const payload = req.body
    axios.post('http://localhost:8081/register',payload)
    .then( response => {
        res.send(response.body);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.post('/login', (req, res) => {
	console.log('Call User service: executing /login')
	const payload = req.body
    axios.post('http://localhost:8081/login',payload)
    .then( response => {
        res.send(response.body);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.post('/updateScore', (req, res) => {
	console.log('Call Leaderboard service: executing /updateScore')
	const payload = req.body
    axios.post('http://localhost:6000/updateScore',payload)
    .then( response => {
        res.send(response.body);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.get('/scoreLeaderboard', (req, res) => {
	console.log('Call Leaderboard service: executing /scoreLeaderboard')
    axios.get('http://localhost:6000/checkResult')
    .then( response => {
        res.send(response.body);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("User service listening at http://%s:%s", host, port)
 })