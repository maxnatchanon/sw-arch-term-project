class ServiceManger {
    static register(user, callback) {
        // TODO: Call register API
        // username -> user.username
        // password -> user.password
        // callback(user, error)
    }

    static login(user, callback) {
        // TODO: Call login API
        // username -> user.username
        // password -> user.password
        // callback(user, errorMessage)
    }

    static getProblem(callback) {
        // TODO: Call problem API
        // callback(problem, errorMessage)
    }

    static checkResult(input, callback) {
        // TODO: Call check result API
        // problemId -> input.problemId
        // answer -> input.answer
        // callback(result(boolean), errorMessage)
    }

    static getLeaderboard(callback) {
        // TODO: Call leaderboard API
        // callback(leaderboard, errorMessage)
    }
}

export default ServiceManger;