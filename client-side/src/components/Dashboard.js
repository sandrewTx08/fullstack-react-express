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

    deleteDocument() {
        let { _id } = this.state.rowAction
        this.setState({ loadingQuery: true })
        axios({
            url: '/api/delete',
            method: 'delete',
            data: {
                _id
            }

        }).catch(failed => {
            return failed.response

        }).then(response => {
            this.setState({ loadingQuery: false })
            return response

        }).then(response => {
            let alertMessage = response.data.message
            this.setState({ query: alertMessage })
            return response
        })
    }

    render() {
        return (<div>
            {this.state.rowAction ?

                // Actions pop-up
                <div className="card">
                    <div className="card-header">
                        <div className="alert alert-primary" role="alert">
                            Do you want to delete {this.state.rowAction.username}
                        </div>
                    </div>

                    <div className="card-body">
                        <button onClick={this.deleteDocument.bind(this)} type="button" className="btn btn-success">Yes</button>
                        <button type="button" className="btn btn-danger">No</button>
                    </div>
                </div>

                // Table
                : <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.query ? this.state.query.map((document, index) => {
                            return (<tr>
                                <th scope="row">{index}</th>
                                <td>{document._id}</td>
                                <td>{document.email}</td>
                                <td>{document.username}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        onClick={() => { this.setState({ rowAction: document }) }}
                                    >
                                        Actions
                                    </button>
                                </td>
                            </tr>)
                        }) : undefined}
                    </tbody>
                </table>}
        </div>)
    }
}

export default Login

