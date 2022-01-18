import axios from 'axios'
import { Link } from "react-router-dom"
import { Component } from "react"
import Form from './Form'
import Input from './Input'


class SignUp extends Component {
    constructor() {
        super()
        this.state = {}
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ loadingQuery: true })
        let { username, password, email, passwordConfirm } = this.state
        axios({
            url: '/api/signup',
            method: 'post',
            data: {
                email,
                username,
                password,
                passwordConfirm
            },

        }).catch(failed => {
            let alertError = failed.response.data.error
            this.setState({ alertError })
            this.setState({ alertMessage: false })
            return failed

        }).then(response => {
            this.setState({ loadingQuery: false })
            return response

        }).then(response => {
            let alertMessage = response.data.message
            this.setState({ alertMessage })
            this.setState({ alertError: false })
            return response
        })
    }

    render() {
        return <Form
            buttonName='Sign-Up'
            headerName='Sign-Up'
            submit={this.handleSubmit.bind(this)}
            alertBox={!this.state.loadingQuery
                ? this.state.alertError
                    ? <div className="alert alert-danger" role="alert">{this.state.alertError}</div>
                    : this.state.alertMessage
                        ? <div className="alert alert-success" role="alert">{this.state.alertMessage}</div>
                        : undefined
                : <img width={'50px'} src={process.env.PUBLIC_URL + "/loading.gif"}></img>}
            footer={<Link to='/login' className='text-decoration-none'>
                Already have an account?
            </Link>}
            inputs={<div>
                {/* Email input */}
                <Input
                    onChange={e => this.setState({ email: e.target.value })}
                    icon='✉️'
                    placeholder='Email'
                    type='email'
                />

                {/* Username input */}
                <Input
                    onChange={e => this.setState({ username: e.target.value })}
                    icon='👤'
                    placeholder='Username'
                    type='text'
                />

                {/* Password input */}
                <Input
                    onChange={e => this.setState({ password: e.target.value })}
                    icon='🔑'
                    placeholder='Password'
                    type='password'
                />

                {/* Confirm password input */}
                <Input
                    onChange={e => this.setState({ passwordConfirm: e.target.value })}
                    icon='🔑'
                    placeholder='Confirm password'
                    type='password'
                />
            </div>} />
    }
}

export default SignUp

