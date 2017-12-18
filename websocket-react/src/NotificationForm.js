import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { SnackbarContent } from 'material-ui/Snackbar'
import SockJsClient from 'react-stomp'


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
    },
    snackbar: {
        margin: theme.spacing.unit,
    }
})

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }


    componentDidMount() {
    }

    handleSendNotify(e) {
        e.preventDefault();
        this.props.handleSendNotify()
    }

    handleChange = key => event => {
        this.props.handleChange(key, event.target.value)
    }

    

    render() {
        const { classes, target, messages, handleMessage, access_token} = this.props
        const notification = messages.map((message, index) => (
            <SnackbarContent key={index} className={classes.snackbar} message={message} />
        ))
        
        return (
            <div className={classes.container}>
                <form onSubmit={this.handleSendNotify.bind(this)}>
                    <TextField
                        id='target'
                        label='Target User'
                        className={classes.textField}
                        value={target}
                        onChange={this.handleChange('target')}
                        margin='normal'
                    />
                    <Button type='submit' raised color='primary' className={classes.button} >Notify</Button>
                </form>
                <div>
                    {messages.length > 0 ? notification : <Typography type="title">You have no any message.</Typography>}
                </div>

                <SockJsClient
                    url={`http://localhost:9292/ws?access_token=${access_token}`}
                    topics={['/user/queue/notify']}
                    onMessage={(message) => handleMessage(message)} />

            </div>

        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginForm)