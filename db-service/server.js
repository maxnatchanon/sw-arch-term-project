const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/softwareArch', { useNewUrlParser: true })

app.use(express.json())
const users = mongoose.model('users', { username: String, password: String,score: 0 })
const leaderBoards = mongoose.model('leaderBoard',  {table: [ { username: String, score: 0 }] })
const problems  = mongoose.model('problem', { problemId: String, question: String, solution: String })

app.get('/', (req, res) => {
  res.json({ message: 'Ahoy!' })
})

app.post('/createUser',async (req,res) => {
    const payload = req.body
    console.log(payload)
    if(payload.username != null && payload.password != null) {
        const findUser = await users.find({username: payload.username})
        if(findUser.length > 0 ) {
            res.status(400).send({ message: 'This username has been taken' })
        }
        else {
             const user = new users({username: payload.username, password: payload.password, score: 0})
             await user.save()
             res.json('Create Success: ' + payload.username)

        }
    } else {
        res.status(400).send({ message: 'Invalid Username or Password' })
    }
})

app.post('/login',async(req,res) => {
    const payload = req.body
    const findUser = await users.find({ username: payload.username,password: payload.password })
    if( findUser.length > 0){
        res.json({ username: findUser[0].username,score: findUser[0].score })
    } else {
       res.status(400).send({ message: 'Invalid Username or Password' })
    }
})

app.post('/updateScore',async(req,res) => {
    const payload = req.body
    const findUser = await users.find({username: payload.username})
    if (findUser.length > 0) {
        await users.updateOne(
            { username: payload.username },
            {
                $set: { score: payload.score}
            }
        )
        res.json(payload)
    } else {
        res.status(400).send({ message: 'Invalid Username or Password' })
    }
})

app.get('/problems',(req,res)=> {
    res.json(problems.find({}))
})

app.get('/scoreLeaderboard', async (req,res) => {
    const board = await users.find({} ,{ username: 1,score :1 }).sort({ score: 1 })
    console.log(board)
   // delete
    res.json(board)
})

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})