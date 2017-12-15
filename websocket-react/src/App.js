import React, { Component } from 'react';
import 'typeface-roboto'
import logo from './logo.svg';
import './App.css';
import LoginFrom from './LoginForm'
import SockJsClient from 'react-stomp'


class App extends Component {


    handleClick() {

    }

    handleSendName() {
        this.stompClient.send("/app/hello", {}, JSON.stringify({ 'name': 'Hello' }))
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <LoginFrom />
                <div>
                    <SockJsClient url='http://localhost:9292/ws' topics={['/user/queue/notify']}
                        onMessage={(msg) => { console.log(msg); }} />
                </div>

            </div>
        );
    }
}

export default App;
