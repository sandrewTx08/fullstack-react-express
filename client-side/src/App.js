import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import Cookies from 'universal-cookie'
import { Component } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
const HOST = 'http://localhost:3001'


class App extends Component {
    constructor() {
        super()
        this.state = {
            cookie: new Cookies()
        }
        this.Verify()
    }

    Verify() {
        axios({
            url: HOST + '/api/verify',
            method: 'post',
            data: {
                token: this.state.cookie.get('token')
            },

        }).catch(failed => {
            let auth = failed.response.data.pass ? true : false
            this.setState({ auth })

        }).then(response => {
            let auth = response.data.pass ? true : false
            this.setState({ auth })
        })
    }

    render() {
        return (<BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='login' element={<div className='d-flex justify-content-center'>
                    <Login />
                </div>}>
                </Route>
                <Route path='signup' element={<div className='d-flex justify-content-center'>
                    <SignUp />
                </div>}>
                </Route>
                <Route path='/' element={<div>
                    {this.state.auth === undefined ? <img src={process.env.PUBLIC_URL + "/loading.gif"}></img>
                        : this.state.auth === false ? <Navigate to="/login" />
                            : this.state.auth === true ? <h1>Dashboard</h1>
                                : undefined}
                </div>}>
                </Route>
            </Routes>
        </BrowserRouter>)
    }
}

export default App

