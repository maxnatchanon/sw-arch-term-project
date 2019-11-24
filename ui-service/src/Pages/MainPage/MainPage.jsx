import React, { Component } from 'react';
import ServiceManager from '../../Services/ServiceManager';
import history from '../../history';
import './MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                score: 0,
            },
            answer: '',
            problem: {
                problemId: '',
                question: '',
            },
            leaderboard: [],
            showResultText: false,
            correct: false,
        };
    }

    componentDidMount = () => {
        if (!this.props.user) {
            history.push('/');
        } else {
            this.setState({
                user: this.props.user,
            });
            this.getProblem();
            this.getLeaderboard();
            setInterval(this.getLeaderboard, 1000);
        }
    }

    handleLogOut = () => {
        this.props.setUser(undefined);
        history.push('/');
    }

    getProblem = () => {
        ServiceManager.getProblem((problem, errorMessage) => {
            if (errorMessage) {
                alert(errorMessage);
            } else {
                this.setState({
                    problem: problem,
                });
            }
        });
    }

    getLeaderboard = () => {
        ServiceManager.getLeaderboard((leaderboard, errorMessage) => {
            if (errorMessage) {
                alert(errorMessage);
            } else {
                this.setState({
                    leaderboard: leaderboard,
                });
            }
        })
    }

    handleAnswerChange = (e) => {
        this.setState({
            answer: e.target.value,
        });
    }

    handleSubmit = () => {
        ServiceManager.checkResult(
            { problemId: this.state.problem.problemId, answer: this.state.answer },
            (correct, errorMessage) => {
                if (errorMessage) {
                    alert(errorMessage);
                } else {
                    this.setState({
                        showResultText: true,
                        correct: correct,
                    });
                    if (correct) {
                        var user = this.state.user;
                        user.score += 1;
                        this.setState({
                            user: user,
                            answer: '',
                        });
                        this.updateScore()
                        this.getProblem()
                    } else {
                        alert('FALSE');
                    }
                }
            }
        )
    }

    updateScore(){
         ServiceManager.updateScore(this.state.user,(leaderboard, errorMessage) => {
            if (errorMessage) {
                alert(errorMessage);
            } 
        })
    }

    render() {
        return (
            <div className='main-page-container'>
                <div className='main-page-header-container'>
                    <div className='main-page-header-user-section'>
                        <p>Logged in as <span>{this.state.user.username}</span></p>
                        <p>Your score: <span>{this.state.user.score}</span></p>
                    </div>
                    <button onClick={this.handleLogOut}>Log out</button>
                </div>
                <div className='main-page-content-container'>
                    <div className='main-page-problem-section'>
                        <div>
                            <span>{this.state.problem.question}&emsp;_________________</span>
                            <input value={this.state.answer} onChange={(e) => this.handleAnswerChange(e)}/>
                            <button onClick={this.handleSubmit}>SUBMIT</button>
                            <div
                            style={{color: this.state.correct ? 'green' : 'red', opacity: this.state.showResultText ? '1' : '0'}}
                            >
                                {this.state.correct ? 'Correct!' : 'Incorrect!'}
                            </div>
                        </div>
                    </div>
                    <div className='main-page-leaderboard-section'>
                        <div className='main-page-leaderboard-header'>Leaderboard</div>
                        {this.state.leaderboard.map((user, index) => 
                            <div
                            className={
                                this.props.user && user.username === this.props.user.username ? 
                                    'main-page-leaderboard-user-me' : 
                                    'main-page-leaderboard-user'
                            }
                            >
                                <span>{index + 1}. {user.username}</span>
                                <span>{user.score}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;