import axios from 'axios'
import { Component } from "react"
const HOST = 'http://localhost:3001'


class SignIn extends Component {
    constructor() {
        super()
        this.state = {}
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ loadingQuery: true })
        let { username, password, email } = this.state
        axios({
            url: HOST + '/api/signin',
            method: 'post',
            data: {
                email,
                username,
                password
            },

        }).catch(failed => {
            this.setState({ loadingQuery: false })

            let alertError = failed.response.data.error
            this.setState({ alertError })

        }).then(response => {
            this.setState({ loadingQuery: false })

            let alertMessage = response.data.message
            this.setState({ alertMessage })
        })
    }

    render() {
        return (<form onSubmit={this.handleSubmit.bind(this)}>
            <div className="border border-secondary rounded border-1 card">

                {/* Form header */}
                <div className="text-center card-header">
                    <h2>Sign-In</h2>
                </div>

                {/* Form body */}
                <div className="p-3">

                    {/* Loading gif && Alert box */}
                    {!this.state.loadingQuery
                        ? this.state.alertError
                            ? <div className="alert alert-danger" role="alert">{this.state.alertError}</div>
                            : this.state.alertMessage
                                ? <div className="alert alert-success" role="alert">{this.state.alertMessage}</div>
                                : undefined
                        : <img width={'50px'} src={process.env.PUBLIC_URL + "/loading.gif"}></img>}

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

                    {/* Submit button */}
                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-primary" type='submit'>Sign-In</button>
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

export default SignIn

