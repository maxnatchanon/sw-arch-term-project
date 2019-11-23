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
        // callback(user, error)
    }

    static getProblem(callback) {
        // TODO: Call problem API
        // callback(problem, error)
    }

    static checkResult(input, callback) {
        // TODO: Call check result API
        // problemId -> input.problemId
        // answer -> input.answer
        // callback(result(boolean), error)
    }

    static getLeaderboard(callback) {
        // TODO: Call leaderboard API
        // callback(leaderboard, error)
    }
}

export default ServiceManger;