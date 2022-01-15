import Login from './components/Login'
import SignIn from './components/SignIn'
import Cookies from 'universal-cookie'
import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
const HOST = 'http://localhost:3001'


class App extends Component {
    constructor() {
        super()
        this.state = {
            cookie: new Cookies(),
            auth: undefined
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

        }).then(response => {
            let auth = response.data.pass ? true : false
            this.setState({ auth })
        })
    }

    render() {
        return (<BrowserRouter>
            <Routes>
                <Route path='login' element={<div className='d-flex justify-content-center'>
                    <Login>
                        <Link to='/signin' className='text-decoration-none'>
                            Don't have an account yet?
                        </Link>
                    </Login>
                </div>}>
                </Route>

                <Route path='signin' element={<div className='d-flex justify-content-center'>
                    <SignIn>
                        <Link to='/login' className='text-decoration-none'>
                            Already have an account?
                        </Link>
                    </SignIn>
                </div>}>
                </Route>

                <Route path='/' element={<div>
                    {this.state.auth
                        ? <h1>Dashboard</h1>
                        : <img src={process.env.PUBLIC_URL+"/loading.gif"}></img>}
                </div>}>
                </Route>
            </Routes>
        </BrowserRouter>)
    }
}

export default App
