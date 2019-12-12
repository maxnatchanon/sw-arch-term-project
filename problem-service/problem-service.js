const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var problems = []

app.get('/problems', (req, res) => {
	console.log('Problem service: executing /problems')
	if (problems.length === 0) {
		res.status(500).send({ message: 'Cannot receive problems from database' })
	} else {
		var problem = problems[Math.floor(Math.random() * problems.length)]
		var result = Object.assign({},problem)
		delete result.solution
		res.json(result)
	}
})

app.get('/checkResult', async (req, res) => {
	console.log('Problem service: executing /checkResult' + req.query.problemId)
	const problem = await problems.find(problem => problem.problemId === req.query.problemId)
	console.log(problem)
	if (problems === undefined) {
		res.status(500).send({ message: 'Problem not found' })
	} else {
		console.log(problem.solution)
		res.send(problem.solution === req.query.answer)
	}
})

app.listen(process.env.PORT, () => {
 	console.log('Start problem service at port ' + process.env.PORT)
 	registerService(process.env.PORT)
 	getProblems()
})

function registerService(servicePort){
	console.log(servicePort)
	axios.post('http://localhost:5000/addService',{
		servicePort : servicePort,
		serviceNumber : 0
	})
		.then(response => {
			console.log('registerServiceSuccessFully')
		})
		.catch(error => {
			console.log('Connot RegisterService')
		})
}

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

