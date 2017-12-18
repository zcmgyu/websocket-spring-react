import React, { Component } from 'react'
import 'typeface-roboto'
import logo from './logo.svg'
import './App.css'
import LoginFrom from './LoginForm'
import NotificationForm from './NotificationForm'
import base64 from 'base-64'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_authenticated: false,
            username: '',
            password: '',
            target: '',
            // messages: []
            messages: [],
            access_token: ''
        }
    }



    handleSendName() {
        this.stompClient.send("/app/hello", {}, JSON.stringify({ 'name': 'Hello' }))
    }

    handleChange(key, value) {
        this.setState({
            [key]: value,
        })
    }

    handleLoginSuccess(json) {
        this.setState({ is_authenticated: true, access_token: json.access_token })
    }

    handleLogin() {
        const { username, password } = this.state
        let headers = new Headers()
        headers.append('Authorization', `Basic ${base64.encode('clientapp:123456')}`)

        fetch(`/oauth/token?grant_type=password&username=${username}&password=${password}`, {
            method: "post",
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then((json) => {
                this.handleLoginSuccess(json)
            })
            .catch(error => { throw error })
    }

    handleSendNotify() {
        // const body = { username: this.state.target }
        fetch(`/some-action/${this.state.target}?access_token=${this.state.access_token}`, {
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            // body: JSON.stringify(body)
        })
            .then((result) => (result))
            .catch((error) => { throw new Error(error) });
    }

    handleClick() {

    }

    handleMessage(message) {
        let { messages } = this.state
        this.setState({ messages: [...messages, message.content] })
    }

    render() {
        let { is_authenticated, messages, target, access_token } = this.state

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Notification Page</h1>
                </header>
                {is_authenticated ?
                    <NotificationForm access_token={access_token} handleMessage={this.handleMessage.bind(this)} handleChange={this.handleChange.bind(this)} target={target} messages={messages} handleSendNotify={this.handleSendNotify.bind(this)} /> :
                    <LoginFrom handleChange={this.handleChange.bind(this)} handleLogin={this.handleLogin.bind(this)} />}
            </div>
        )
    }
}

export default App


