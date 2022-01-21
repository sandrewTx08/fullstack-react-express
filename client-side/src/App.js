import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'


const App = () => {
    const cookie = new Cookies()
    const getVerify = () => {
        axios({
            url: '/api/verify',
            method: 'post',
            data: {
                token: cookie.get('token')
            }

        }).catch(failed => {
            return failed.response

        }).then(response => {
            return response.data

        }).then(data => {
            setAuth(data.pass ? true : false)
        })
    }

    const [auth, setAuth] = useState(async () => await getVerify())

    return (<BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={!auth
                // Redirect
                ? <Navigate to="/login" />
                // Pass
                : <Dashboard />}>
            </Route>
            <Route path='login' element={<div className='d-flex justify-content-center'>
                <Login />
            </div>}>
            </Route>
            <Route path='signup' element={<div className='d-flex justify-content-center'>
                <SignUp />
            </div>}>
            </Route>
        </Routes>
    </BrowserRouter>)
}


export default App

