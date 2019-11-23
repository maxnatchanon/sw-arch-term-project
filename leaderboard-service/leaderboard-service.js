const express = require('express')
const app = express()
const axios = require('axios').default

const PORT = 6000
var scoreCache

app.use(express.json())

app.get('/scoreLeaderboard', (req, res) => {
    if (scoreCache === undefined) {
        axios.get('localhost:9000/scoreLeaderboard')
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
    res.status(200).json(scoreCache)
})

app.post('/updateScore', (req, res) => {
    axios.post('localhost:9000/updateScore', req.body)
    .then(response => {
        scoreCache = response.data
        console.log('Updated the user score')
    })
    .catch(error => {
        console.log('Failed to update the user score')
        console.error(error)
        res.status(error.response.status).send(error.response.data.message)
        return
    })
})

app.listen(PORT, () => {
    console.log('Started leaderboard service at port ' + PORT)
})
