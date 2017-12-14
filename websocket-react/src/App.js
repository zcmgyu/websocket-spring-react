import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import EmployeeList from './EmployeeList'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
class App extends Component {

    constructor(props) {
        super(props)
        let socket = new SockJS("/gs-guide-websocket");
        this.stompClient = Stomp.over(socket);
        
    }



    handleClick() {
        // Create stomp client over sockJS protocol (see Note 1)


        // callback function to be called when stomp client is connected to server (see Note 2)
        let connectCallback = function () {
            alert("connected!");
            this.stompClient.subscribe('/topic/greetings', function (greeting) {
                alert(JSON.parse(greeting.body).content);
            });
        };

        // callback function to be called when stomp client could not connect to server (see Note 3)
        let errorCallback = function (error) {
            // display the error's message header:
            alert(error.headers.message);
        };

        // Connect as guest (Note 4)
        this.stompClient.connect("guest", "guest", connectCallback, errorCallback);

        // function showGreeting(message) {
        //     alert(message);
        // }

        // // Connect as guest (Note 4)
        // this.stompClient.connect({}, function (frame) {
        //     console.log('Connected: ' + frame);
        //     this.stompClient.subscribe('/topic/greetings', function (greeting) {
        //         showGreeting(JSON.parse(greeting.body).content);
        //     });
        // });

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
                <button onClick={this.handleClick.bind(this)}>Connect</button>
                <button onClick={this.handleSendName.bind(this)}>Send Name</button>

            </div>
        );
    }
}

export default App;
