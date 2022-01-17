const { Login } = require('../modules/model')
const bcrypt = require('bcrypt')
const body = require('body-parser').json()
const router = require('express').Router()


router.post('/', body, async (req, res) => {
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

    } else if (!req.body.password === !req.body.passwordConfirm) {
        return res.status(400).json({
            error: "Can't confirm password."
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

