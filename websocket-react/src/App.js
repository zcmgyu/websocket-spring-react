import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeList from './EmployeeList'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
    }


    componentDidMount() {
        fetch('/api/employees', { method: 'GET' })
            .then((result) => (result.json()))
            .then((response) => {
                console.log(response)
                this.setState({ employees: response.employees })
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <EmployeeList employees={this.state.employees} />
            </div>
        );
    }
}

export default App;
