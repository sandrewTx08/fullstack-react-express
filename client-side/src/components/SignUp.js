import axios from 'axios'
import { Link } from "react-router-dom"
import { Component } from "react"
import Form from './Form'


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
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">✉️</span>
                    <input
                        onChange={e => this.setState({ email: e.target.value })}
                        placeholder="Email"
                        type="email"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"></input>
                </div>

                {/* Username input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">👤</span>
                    <input
                        onChange={e => this.setState({ username: e.target.value })}
                        placeholder="Username"
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"></input>
                </div>

                {/* Password input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">🔑</span>
                    <input
                        onChange={e => this.setState({ password: e.target.value })}
                        placeholder="Password"
                        type="password"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"></input>
                </div>

                {/* Confirm password input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">🔑</span>
                    <input
                        onChange={e => this.setState({ passwordConfirm: e.target.value })}
                        placeholder="Confirm password"
                        type="password"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"></input>
                </div>
            </div>} />
    }
}

export default SignUp

