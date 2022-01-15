require('dotenv').config()
const { Login } = require('../modules/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const body = require('body-parser').json()


router.post('/', body, async (req, res) => {
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