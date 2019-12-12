const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

var services = [[],[],[]]
var serviceName = ['ProblemService','UserService','LeaderboardService']

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function randomIndex(serviceNumber){
    var randomNumber = (parseInt(Math.random()*100))%services[serviceNumber].length
    return randomNumber
}

app.get('/problems', (req, res) => {
    getProblems(res)
})

async function  getProblems(res) {
    var index = randomIndex(0)
    var port = services[0][index]

    console.log('Call Problem service: executing /problems at port='+port + 'at index='+index)
    await axios.get('http://localhost:'+port+'/problems')
    .then( response => {
        console.log(response.data)
        res.json(response.data);
    })
    .catch(error => {
        services[0].splice(index,1)
        if(services[0].length == 0)
             res.status(error.response.status).send(error.response.data)
        else {
            getProblems(res)
        }
    })
}

app.get('/checkResult', async(req, res) => {
    checkResult(req,res)
})

async function checkResult(req,res){
    var index = randomIndex(0)
    var port = services[0][index]
    console.log('Call Problem service: executing /checkResult at port='+port)
    await axios.get('http://localhost:'+port+'/checkResult', {
        params: {
          problemId : req.query.problemId,
          answer : req.query.answer
        }
    })
    .then( response => {
        res.send(response.data);
    })
    .catch(error => {
        services[0].splice(index,1)
        if(services[0].length == 0)
             res.status(error.response.status).send(error.response.data)
        else {
            checkResult(req,res)
        }
    })
}

app.post('/register', (req, res) => {
    register(req,res)
})

async function register(req,res) {
    var index = randomIndex(1)
    var port = services[1][index]
    console.log('Call User service: executing /register at Port='+port)
    const payload = req.body
    await axios.post('http://localhost:'+port+'/register',payload)
    .then( response => {
        console.log(response.data)
        res.send(response.data);
    })
    .catch(error => {
        services[1].splice(index,1)
        if(services[1].length == 0)
             res.status(error.response.status).send(error.response.data)
        else {
            register(req,res)
        }
    })
}

app.post('/login', (req, res) => {
	login(req,res)
})

async function login(req,res) {
    var index = randomIndex(1)
    var port = services[1][index]
    console.log('Call User service: executing /login at Port=',port)
    const payload = req.body
    await axios.post('http://localhost:'+port+'/login',payload)
    .then( response => {
        res.send(response.data);
    })
    .catch(error => {
        services[1].splice(index,1)
        if(services[1].length == 0)
             res.status(error.response.status).send(error.response.data)
        else {
            login(req,res)
        }
    })
}

app.post('/updateScore', (req, res) => {
	updateScore(req,res)
})

async function updateScore(req,res){
    var index = randomIndex(2)
    var port = services[2][index]
    console.log('Call Leaderboard service: executing /updateScore')
    const payload = req.body
    await axios.post('http://localhost:'+port+'/updateScore',payload)
    .then( response => {
        res.send(response.data);
    })
    .catch(error => {
        services[2].splice(index,1)
        if(services[2].length == 0)
             res.status(error.response.status).send(error.response.data)
        else {
            updateScore(req,res)
        }
    })
}

app.get('/scoreLeaderboard', (req, res) => {
	scoreLeaderboard(res)
})

async function scoreLeaderboard(res) {
    var index = randomIndex(2)
    var port = services[2][index]
    console.log('Call Leaderboard service: executing /scoreLeaderboard')
    await axios.get('http://localhost:6000/scoreLeaderboard')
    .then( response => {
        res.send(response.data);
    })
    .catch(error => {
        services[2].splice(index,1)
        if(services[2].length == 0){
             console.log(error.response)
             res.status(error.response.status).send(error.response.data)
        }
        else {
            updateScore(req,res)
        }
    })
}

app.post('/addService',async(req,res) => {
    const payload = req.body
    console.log('Add ' + serviceName[payload.serviceNumber]+'  at Port '+payload.servicePort)
    await services[payload.serviceNumber].push(payload.servicePort)
    res.send('successfully')
})

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("User service listening at http://%s:%s", host, port)
 })