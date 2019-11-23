import React, { Component } from 'react';
import ServiceManager from '../../Services/ServiceManager';
import history from '../../history';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleLoginButton = () => {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            alert('Please enter your username and password');
            return;
        }
        ServiceManager.login(this.state, (user, errorMessage) => {
            if (user) {
                this.props.setUser(user)
                history.push('/main')
            } else if (errorMessage) {
                alert(errorMessage)
            }
        })
    }

    handleRegisterButton = () => {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            alert('Please enter your username and password');
            return;
        }
        ServiceManager.register(this.state, (user, errorMessage) => {
            if (user) {
                this.props.setUser(user)
                history.push('/main')
            } else if (errorMessage) {
                alert(errorMessage)
            }
        })
    }

    render() {
        return (
            <div className='login-page-container'>
                <div>
                    <input name='username' placeholder='Username' onChange={(e) => this.handleInputChange(e)}/>
                    <input name='password' placeholder='Password' onChange={(e) => this.handleInputChange(e)}/>
                    <div>
                        <button onClick={this.handleLoginButton}>Log in</button>
                        <button onClick={this.handleRegisterButton}>Register</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;