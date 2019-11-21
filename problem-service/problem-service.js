const express = require('express')
const app = express()
const axios = require('axios')

var problems = []

app.get('/problem', (req, res) => {
	console.log('Problem service: executing /problem')
	if (problems.length === 0) {
		res.status(500).send({ message: 'Cannot receive problems from database' })
	} else {
		res.send(problems[Math.floor(Math.random() * problems.length)])
	}
})

app.get('/checkResult', (req, res) => {
	console.log('Problem service: executing /checkResult')
	const problem = problems.find(problem => problem.problemId === req.query.problemId)
	if (problems === undefined) {
		res.status(500).send({ message: 'Problem not found' })
	} else {
		res.send(problem.solution === req.query.answer)
	}
})

app.listen(process.env.PORT, () => {
 	console.log('Start problem service at port ' + process.env.PORT)
 	getProblems()
})

function getProblems() {
	axios.get('http://localhost:9000/problems')
		.then(response => {
			problems = response.data
			console.log('Successfully received problems from database')
			console.log('This service is ready')
		})
		.catch(error => {
			console.log('Cannot receive problems from database')
			console.log('Try again in 5 seconds...')
			setTimeout(getProblems, 5000)
		})
}