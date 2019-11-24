const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

app.get('/problems', (req, res) => {
    var port = (Math.random()<0.5) ? (8080) : (8081);
	console.log('Call Problem service: executing /problems at port='+port)
    axios.get('http://localhost:'+port+'/problems')
    .then( response => {
        console.log(response.data)
        res.json(response.data);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.get('/checkResult', (req, res) => {
    var port = (Math.random()<0.5) ? (8080) : (8081);
	console.log('Call Problem service: executing /checkResult at port='+port)
    axios.get('http://localhost:'+port+'/checkResult', {
        params: {
          problemId : req.query.problemId,
          answer : req.query.answer
        }
    })
    .then( response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.post('/register', (req, res) => {
	console.log('Call User service: executing /register')
	const payload = req.body
    axios.post('http://localhost:7000/register',payload)
    .then( response => {
        console.log(response.data)
        res.send(response.data);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.post('/login', (req, res) => {
	console.log('Call User service: executing /login')
	const payload = req.body
    axios.post('http://localhost:7000/login',payload)
    .then( response => {
        res.send(response.data);
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
        res.send(response.data);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

app.get('/scoreLeaderboard', (req, res) => {
	console.log('Call Leaderboard service: executing /scoreLeaderboard')
    axios.get('http://localhost:6000/scoreLeaderboard')
    .then( response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error.response.status);
        res.status(error.response.status).send(error.response.data)
    })
})

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("User service listening at http://%s:%s", host, port)
 })