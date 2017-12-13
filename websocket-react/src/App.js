import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getInitialState() {
    return ({ employees: [] });
  }
  componentDidMount() {
    client({ method: 'GET', path: '/api/employees' }).done(response => {
      this.setState({ employees: response.entity._embedded.employees });
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
