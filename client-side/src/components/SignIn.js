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

            <div class="card border border-dark rounded">
                <div class="card-header text-center">
                    <h2>Sign-in</h2>
                </div>

                <div class="card-body">
                    {this.state.alert
                        ? <div className="alert alert-warning" role="alert">{this.state.alert}</div>
                        : undefined
                    }

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                        <input
                            onChange={e => this.setState({ email: e.target.value })}
                            type="email"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"></input>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                        <input
                            onChange={e => this.setState({ username: e.target.value })}
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"></input>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input
                            onChange={e => this.setState({ password: e.target.value })}
                            type="password"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"></input>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-primary" type='submit'>Login</button>
                    </div>

                    <div class='container'>
                        {this.props.children}
                    </div>

                </div>
            </div>
        </form>)
    }
}

export default SignIn

