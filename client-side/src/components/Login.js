import axios from 'axios'
import Form from './Form'
import Input from './Input'
import { useState } from "react"
import { Navigate, Link } from "react-router-dom"
import Cookies from 'universal-cookie'


export default () => {
    const cookie = new Cookies()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loadingQuery, setLoadingQuery] = useState('')
    const [alertError, setAlertError] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoadingQuery(true)
        axios({
            url: '/api/login',
            method: 'post',
            data: {
                username,
                password
            }

        }).catch(failed => {
            return failed.response

        }).then(response => {
            setLoadingQuery(false)
            return response.data

        }).then(data => {
            if (!data.error) {
                cookie.set('token', data.token)
                setAlertError(false)
                setAlertMessage(data.message)

            } else {
                setAlertMessage(false)
                setAlertError(data.error)
            }
        })
    }

    if (alertMessage) {
        return <Navigate to='/' />

    } else {
        return <Form
            buttonName='Login'
            headerName='Login'
            submit={handleSubmit}
            alertBox={!loadingQuery
                ? alertError
                    ? <div className="alert alert-danger" role="alert">{alertError}</div>
                    : alertMessage
                        ? <div className="alert alert-success" role="alert">{alertMessage}</div>
                        : undefined
                : <img width={'50px'} src={process.env.PUBLIC_URL + "/loading.gif"}></img>}
            footer={<Link to='/signup' className='text-decoration-none'>
                Don't have an account yet?
            </Link>}
            inputs={<div>
                {/* Username input */}
                <Input
                    onChange={e => setUsername(e.target.value)}
                    icon='👤'
                    placeholder='Username'
                    type='text'
                />

                {/* Password input */}
                <Input
                    onChange={e => setPassword(e.target.value)}
                    icon='🔑'
                    placeholder='Password'
                    type='password'
                />
            </div>} />
    }
}

