import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import EmployeeList from './EmployeeList'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

class App extends Component {

    componentDidMount() {
        // Create stomp client over sockJS protocol (see Note 1)
        let socket = new SockJS("/hello");
        let stompClient = Stomp.over(socket);

        // callback function to be called when stomp client is connected to server (see Note 2)
        let connectCallback = function () {
            alert("connected!");
            stompClient.subscribe('/topic/greetings', function (greeting) {
                alert(JSON.parse(greeting.body).content);
            });
        };

        // callback function to be called when stomp client could not connect to server (see Note 3)
        let errorCallback = function (error) {
            // display the error's message header:
            alert(error.headers.message);
        };

        // Connect as guest (Note 4)
        stompClient.connect("guest", "guest", connectCallback, errorCallback);
    }


    handleData(data) {
        let result = JSON.parse(data);
        console.log(result)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
            </div>
        );
    }
}

export default App;
