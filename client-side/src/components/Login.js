import axios from 'axios'
import { Component } from "react"
import { Navigate } from "react-router-dom"
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
            return (<form onSubmit={this.handleSubmit.bind(this)}>
                <div className="border border-secondary rounded border-1 card">

                    {/* Form header */}
                    <div className="text-center card-header">
                        <h2>Login</h2>
                    </div>

                    {/* Form body */}
                    <div className="p-3">

                        {/* Loading gif && Alert box*/}
                        {!this.state.loadingQuery
                            ? this.state.alertError
                                ? <div className="alert alert-danger" role="alert">{this.state.alertError}</div>
                                : undefined
                            : <img width={'50px'} src={process.env.PUBLIC_URL + "/loading.gif"}></img>}

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

                        {/* Submit button */}
                        <div className='d-flex justify-content-center'>
                            <button className="btn btn-primary" type='submit'>Login</button>
                        </div>

                        {/* Form footer */}
                        <div className='container pt-4'>
                            {this.props.children}
                        </div>

                    </div>
                </div>
            </form>)
        }
    }
}

export default Login

