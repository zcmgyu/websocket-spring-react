import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import base64 from 'base-64'



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit * 2,
    }
});

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    handleLogin(e) {

        const { username, password } = this.state
        alert(username + password)

        let headers = new Headers();
        headers.append('Authorization', `Basic ${base64.encode('clientapp:123456')}`);

        const body = {
            
            'username': username,
            'password': password
        }
        fetch(`/oauth/token?grant_type=password&username=${username}&password=${password}`, {
            method: "post",
            headers: headers
        })
            .then(response => {
                    return response.json()
            })
            .then(json => {
                localStorage.setItem('result', JSON.stringify(json));
            })
            .catch(error => { throw error });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props
        return (
            <form className={classes.container}>
                <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('username')}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <Button raised color="primary" className={classes.button} onClick={this.handleLogin.bind(this)} >
                    Login
              </Button>
            </form>
        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginForm)