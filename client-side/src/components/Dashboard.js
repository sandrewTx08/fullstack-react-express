import axios from 'axios'
import { Component } from "react"


class Login extends Component {
    constructor() {
        super()
        this.state = {}
        this.handleSubmit()
    }

    handleSubmit() {
        this.setState({ loadingQuery: true })
        axios({
            url: '/api/dashboard',
            method: 'get'

        }).then(response => {
            this.setState({ loadingQuery: false })
            return response

        }).then(response => {
            let query = response.data.query
            this.setState({ query })
            return response
        })
    }

    render() {
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.query ? this.state.query.map((document, index) => {
                        return (<tr>
                            <th scope="row">{index}</th>
                            <td>{document._id}</td>
                            <td>{document.email}</td>
                            <td>{document.username}</td>
                        </tr>)
                    }) : undefined}
                </tbody>
            </table>
        )
    }
}

export default Login

