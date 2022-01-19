import axios from 'axios'
import { Component } from "react"


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {}
        this.getDashboard()
    }

    getDashboard() {
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

        }).then(() => {
            this.setState({ loadingQuery: false })

        }).then(() => {
            this.setState({ rowAction: undefined })
            this.getDashboard()
        })
    }

    render() {
        return (<div className='d-flex pt-3 justify-content-center'>
            {this.state.rowAction

                // Actions pop-up
                ? <div className="card w-25">
                    <div className="card-header">
                        <h3>Are you want delete this account?</h3>
                    </div>

                    {/* Ask box */}
                    <div className="card-body">
                        <ul class="list-group">
                            <li class="list-group-item"><b>ID: </b> {this.state.rowAction._id}</li>
                            <li class="list-group-item"><b>Email: </b>{this.state.rowAction.email}</li>
                            <li class="list-group-item"><b>Username: </b> {this.state.rowAction.username}</li>
                        </ul>
                    </div>

                    <div class="card-footer text-muted d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deleteDocument.bind(this)}>Yes, do it now.</button>
                    </div>
                </div>

                // Dashboard table
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
                                        className="btn btn-outline-danger btn-sm"
                                        type="button"
                                        onClick={() => { this.setState({ rowAction: document }) }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        }) : undefined}
                    </tbody>
                </table>}
        </div>)
    }
}

export default Dashboard

