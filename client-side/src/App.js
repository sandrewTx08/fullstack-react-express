import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Cookies from 'universal-cookie'
import { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'


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
            url: '/api/verify',
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
                <Route path='/' element={!this.state.auth
                    ? <Navigate to="/login" />
                    : <Dashboard />}>
                </Route>
            </Routes>
        </BrowserRouter >)
    }
}

export default App

