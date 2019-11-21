const express = require('express')
const app = express()
const axios = require('axios')

app.get('/problem', (req, res) => {
	console.log('Problem service: executing /problem')
	axios.get('http://localhost:9000/problem')
		.then(response => {
			console.log('Problem service: received response from database service')
			res.send(response.data)
		})
		.catch(error => {
			console.log('Problem service: received error from database service')
			console.error(error)
			res.status(error.response.status).send(error.response.data.message)
		})
})

app.get('/checkResult', (req, res) => {
	console.log('Problem service: executing /checkResult')
	axios.get('http://localhost:9000/checkResult')
		.then(response => {
			console.log('Problem service: received response from database service')
			res.send(response.data)
		})
		.catch(error => {
			console.log('Problem service: received error from database service')
			console.error(error)
			res.status(error.response.status).send(error.response.data.message)
		})
})

app.listen(process.env.PORT, () => {
  console.log('Start problem service at port ' + process.env.PORT)
})