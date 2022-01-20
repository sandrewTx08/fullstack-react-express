import axios from 'axios'
import { Link } from "react-router-dom"
import { useState } from "react"
import Form from './Form'
import Input from './Input'


export default () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [loadingQuery, setLoadingQuery] = useState('')
    const [alertError, setAlertError] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoadingQuery(true)
        axios({
            url: '/api/signup',
            method: 'post',
            data: {
                email,
                username,
                password,
                passwordConfirm
            }

        }).catch(failed => {
            return failed.response

        }).then(response => {
            setLoadingQuery(false)
            return response.data

        }).then(data => {
            if (!data.error) {
                setAlertError(false)
                setAlertMessage(data.message)

            } else {
                setAlertMessage(false)
                setAlertError(data.error)
            }
        })
    }

    return <Form
        buttonName='Sign-Up'
        headerName='Sign-Up'
        submit={handleSubmit}
        alertBox={!loadingQuery
            ? alertError
                ? <div className="alert alert-danger" role="alert">{alertError}</div>
                : alertMessage
                    ? <div className="alert alert-success" role="alert">{alertMessage}</div>
                    : undefined
            : <img width={'50px'} src={process.env.PUBLIC_URL + "/loading.gif"}></img>}
        footer={<Link to='/login' className='text-decoration-none'>
            Already have an account?
        </Link>}
        inputs={<div>
            {/* Email input */}
            <Input
                onChange={e => setEmail(e.target.value)}
                icon='✉️'
                placeholder='Email'
                type='email'
            />

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

            {/* Confirm password input */}
            <Input
                onChange={e => setPasswordConfirm(e.target.value)}
                icon='🔑'
                placeholder='Confirm password'
                type='password'
            />
        </div>} />
}

