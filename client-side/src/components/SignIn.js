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
        let { username, password, email } = this.state
        axios({
            url: HOST + '/api/signin',
            method: 'post',
            data: {
                email,
                username,
                password
            },

        }).catch(request => {
            let alert = request.response.data.error
            this.setState({ alert })

        }).then((response) => {
            let alert = response.data.message
            this.setState({ alert })
        })
    }

    render() {
        return (<form onSubmit={this.handleSubmit.bind(this)}>

            <div className="border border-secondary rounded border-1 card">
                <div className="text-center card-header">
                    <h2>Sign-in</h2>
                </div>
                <div className="p-3">
                    {this.state.alert
                        ? <div className="alert alert-warning" role="alert">{this.state.alert}</div>
                        : undefined
                    }

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

                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-primary" type='submit'>Login</button>
                    </div>

                    <div className='container pt-4'>
                        {this.props.children}
                    </div>

                </div>
            </div>
        </form>)
    }
}

export default SignIn

