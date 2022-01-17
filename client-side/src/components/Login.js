import axios from 'axios'
import Form from './Form'
import { Component } from "react"
import { Navigate, Link } from "react-router-dom"
import Cookies from 'universal-cookie'
const HOST = 'http://localhost:3001'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            cookie: new Cookies()
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ loadingQuery: true })
        let { username, password } = this.state
        axios({
            url: HOST + '/api/login',
            method: 'post',
            data: {
                username,
                password
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
            this.state.cookie.set('token', response.data.token)
            this.setState({ alertMessage })
            this.setState({ alertError: false })
            return response
        })
    }

    render() {
        if (this.state.alertMessage) {
            return <Navigate to='/' />

        } else {
            return <Form
                buttonName='Login'
                headerName='Login'
                submit={this.handleSubmit.bind(this)}
                alertBox={!this.state.loadingQuery
                    ? this.state.alertError
                        ? <div className="alert alert-danger" role="alert">{this.state.alertError}</div>
                        : this.state.alertMessage
                            ? <div className="alert alert-success" role="alert">{this.state.alertMessage}</div>
                            : undefined
                    : <img width={'50px'} src={process.env.PUBLIC_URL + "/loading.gif"}></img>}
                footer={<Link to='/signup' className='text-decoration-none'>
                    Don't have an account yet?
                </Link>}
                inputs={<div>
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
                </div>} />
        }
    }
}

export default Login

