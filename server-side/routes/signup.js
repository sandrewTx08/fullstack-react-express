require('dotenv').config()
const { Login } = require('../modules/model')
const bcrypt = require('bcrypt')
const body = require('body-parser').json()
const router = require('express').Router()


router.post('/', body, async (req, res) => {
    
    // Check
    if (req.body.username.length < Number(process.env.USERNAME_LENGTH_MIN)) {
        return res.status(400).json({
            error: `Username have less than ${process.env.USERNAME_LENGTH_MIN} characters.`
        })

    } else if (req.body.username.length > Number(process.env.USERNAME_LENGTH_MAX)) {
        return res.status(400).json({
            error: `Username have more than ${process.env.USERNAME_LENGTH_MAX} characters.`
        })
    }

    // Check
    if (!req.body.email) {
        return res.status(400).json({
            error: 'Email is empty.'
        })

    } else if (!req.body.username && !req.body.password) {
        return res.status(400).json({
            error: 'Username and password are empty.'
        })

    } else if (!req.body.username) {
        return res.status(400).json({
            error: 'Username is empty.'
        })

    } else if (!req.body.password) {
        return res.status(400).json({
            error: 'Password is empty.'
        })

    } else if (req.body.password != req.body.passwordConfirm) {
        return res.status(400).json({
            error: "Can't confirm password."
        })
    }

    // Check
    if (req.body.password.length < Number(process.env.PASSWORD_LENGTH_MIN)) {
        return res.status(400).json({
            error: `Password have less than ${process.env.PASSWORD_LENGTH_MIN} characters.`
        })

    } else if (req.body.password.length > Number(process.env.PASSWORD_LENGTH_MAX)) {
        return res.status(400).json({
            error: `Password have more than ${process.env.PASSWORD_LENGTH_MAX} characters.`
        })
    }

    // Check
    if (req.body.email.includes(' ')) {
        return res.status(400).json({
            error: 'Email should not have space.'
        })

    } else if (req.body.username.includes(' ') && req.body.password.includes(' ')) {
        return res.status(400).json({
            error: 'Username and password should not have space.'
        })

    } else if (req.body.username.includes(' ')) {
        return res.status(400).json({
            error: 'Username should not have space.'
        })

    } else if (req.body.password.includes(' ')) {
        return res.status(400).json({
            error: 'Password should not have space.'
        })
    }

    let queryByUsername = await Login.findOne({
        username: req.body.username
    }).exec()

    let queryByEmail = await Login.findOne({
        email: req.body.email
    }).exec()

    if (queryByEmail) {
        return res.status(409).json({
            error: 'Email is already in use.'
        })

    } else if (queryByUsername) {
        return res.status(409).json({
            error: 'Username is already in use.'
        })

    } else if (!queryByUsername && !queryByEmail) {
        await bcrypt.hash(req.body.password, Number(process.env.HASH_SALT))
            .then(async hash => {
                await Login.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash
                })
                // OK
                res.status(201).json({
                    message: `User ${req.body.username} created with success!`
                })
            })
    }
})


module.exports = router

