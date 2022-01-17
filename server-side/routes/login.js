require('dotenv').config()
const { Login } = require('../modules/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const body = require('body-parser').json()


router.post('/', body, async (req, res) => {
    
    // Check
    if (!req.body.username && !req.body.password) {
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
    }
    
    // Check
    if (req.body.username.includes(' ') && req.body.password.includes(' ')) {
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

    let query = await Login.findOne({
        username: { $in: req.body.username },
    }).exec()

    if (query) {
        await bcrypt.compare(req.body.password, query.password)
            .then(pass => {
                pass ? res.status(201).json({
                    message: `Welcome ${req.body.username}!`,
                    token: jwt.sign({ query }, process.env.JWT_SECRET)

                }) : res.status(401).json({
                    error: 'Bad credentials.'
                })
            })

    } else {
        res.status(400).json({
            error: `${req.body.username} dont exist.`
        })
    }
})


module.exports = router