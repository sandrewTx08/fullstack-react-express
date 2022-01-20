import axios from 'axios'
import { useState } from "react"


export default () => {
    const getDashboard = () => {
        setLoadingQuery(true)
        axios({
            url: '/api/dashboard',
            method: 'get'

        }).catch(failed => {
            return failed.response

        }).then(response => {
            setLoadingQuery(false)
            return response.data

        }).then(data => {
            setQuery(data.query)

        })
    }

    const [loadingQuery, setLoadingQuery] = useState('')
    const [query, setQuery] = useState(() => getDashboard())
    const [rowAction, setRowAction] = useState('')

    const deleteDocument = () => {
        let { _id } = rowAction
        setLoadingQuery(true)
        axios({
            url: '/api/delete',
            method: 'delete',
            data: {
                _id
            }

        }).catch(failed => {
            return failed.response

        }).then(response => {
            setLoadingQuery(false)
            return response.data

        }).then(data => {
            getDashboard()
            setRowAction(null)
        })
    }

    return (<div className='d-flex pt-3 justify-content-center' >
        {rowAction

            // Delete account pop-up
            ? <div className="card w-25">
                <div className="card-header">
                    <h3>Are you want delete this account?</h3>
                </div>

                <div className="card-body">
                    <ul class="list-group">
                        <li class="list-group-item"><b>ID: </b> {rowAction._id}</li>
                        <li class="list-group-item"><b>Email: </b>{rowAction.email}</li>
                        <li class="list-group-item"><b>Username: </b> {rowAction.username}</li>
                    </ul>
                </div>

                <div class="card-footer text-muted d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteDocument()}>Yes, do it now.</button>
                </div>
            </div>

            // Dashboard table
            : query && <table className="table table-striped">
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
                    {query.map((document, index) => {
                        return (<tr>
                            <th scope="row">{index}</th>
                            <td>{document._id}</td>
                            <td>{document.email}</td>
                            <td>{document.username}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    type="button"
                                    onClick={() => setRowAction(document)}>
                                    Delete
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>}
    </div>)
}

