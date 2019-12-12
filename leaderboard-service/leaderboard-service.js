const express = require('express')
const app = express()
const axios = require('axios').default
var scoreCache

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/scoreLeaderboard', async (req, res) => {
    if (scoreCache === undefined) {
        await axios.get('http://localhost:9000/scoreLeaderboard')
        .then(response => {
            scoreCache = response.data
            console.log('Successfully received a leaderboard from database')
        })
        .catch(error => {
            console.log('Cannot receive a leaderboard from database')
            console.error(error)
            res.status(error.response.status).send(error.response.data.message)
            return
        })
    }
    console.log(scoreCache)
    res.json(scoreCache)
})

app.post('/updateScore', (req, res) => {
    console.log(req.body)
    axios.post('http://localhost:9000/updateScore', req.body)
    .then(response => {
        scoreCache = response.data
        res.send(scoreCache)
        console.log(scoreCache)
    })
    .catch(error => {
        console.log('Failed to update the user score')
        console.error(error)
        res.status(error.response.status).send(error.response.data.message)
        return
    })
})

app.listen(process.env.PORT, () => {
    console.log('Started leaderboard service at port ' + process.env.PORT)
    registerService(process.env.PORT)
})

function registerService(servicePort){
    console.log(servicePort)
    axios.post('http://localhost:5000/addService',{
        servicePort : servicePort,
        serviceNumber : 2
    })
        .then(response => {
            console.log('registerServiceSuccessFully')
        })
        .catch(error => {
            console.log('Connot RegisterService')
        })
}