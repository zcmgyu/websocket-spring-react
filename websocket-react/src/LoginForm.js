import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'


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
    handleChange = key => event => {
        this.props.handleChange(key, event.target.value)
    }

    render() {
        const { classes, handleLogin, username, password } = this.props
        
        return (
            <form className={classes.container} onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
            }}>
                <TextField
                    id='username'
                    label='Username'
                    className={classes.textField}
                    value={username}
                    onChange={this.handleChange('username')}
                    margin='normal'
                />
                <TextField
                    id='password'
                    label='Password'
                    type='password'
                    className={classes.textField}
                    value={password}
                    onChange={this.handleChange('password')}
                    margin='normal'
                />
                <Button type='submit' raised color='primary' className={classes.button}  >
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