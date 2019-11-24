import React from 'react';
import axios from 'axios';

const GATEWAY_PORT = 5000
class ServiceManger {
    static register(user, callback) {
        axios.post('http://localhost:'+GATEWAY_PORT+'/register',user)
            .then(response => {
                console.log(response.data)
                callback(response.data,undefined)
            })
            .catch(error => {
                console.log(error.response.data.message)
                callback(undefined,error.response.data.message)
            })
    }

    static login(user, callback) {
        axios.post('http://localhost:'+GATEWAY_PORT+'/login',user)
            .then(response => {
                console.log(response.data)
                callback(response.data,undefined)
            })
            .catch(error => {
                console.log(error.response.data.message)
                callback(undefined,error.response.data.message)
            })
    }

    static getProblem(callback) {
        // TODO: Call problem API
        axios.get('http://localhost:'+GATEWAY_PORT+'/problems')
            .then(response => {
                console.log(response.data)
                callback(response.data,undefined)
            })
            .catch(error => {
                console.log(error.response.data.message)
                callback(undefined,error.response.data.message)
            })
    }

    static checkResult(input, callback) {
        axios.get('http://localhost:'+GATEWAY_PORT+'/checkResult', {
            params: {
                problemId : input.problemId,
                answer : input.answer
            }
        })
            .then(response => {
                console.log(response.data)
                callback(response.data,undefined)
            })
            .catch(error => {
                console.log(error.response.data.message)
                callback(undefined,error.response.data.message)
            })
    }

    static getLeaderboard(callback) {
        axios.get('http://localhost:'+GATEWAY_PORT+'/scoreLeaderboard')
            .then(response => {
                console.log(response.data)
                callback(response.data,undefined)
            })
            .catch(error => {
                console.log(error.response.data)
                callback(undefined,error.response.data)
            })
    }

    static updateScore(user,callback) {
        axios.post('http://localhost:'+GATEWAY_PORT+'/updateScore',user)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data.message)
                callback(undefined,error.response.data.message)
            })
    }
}

export default ServiceManger;