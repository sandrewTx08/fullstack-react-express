require('dotenv').config()
const jwt = require('jsonwebtoken')
const body = require('body-parser').json()
const router = require('express').Router()


router.post('/', body, (req, res) => {
    try {
        jwt.verify(req.body.token, process.env.JWT_SECRET)
        res.status(200).json({
            pass: true
        })

    } catch (e) {
        res.status(403).json({
            pass: false,
            error: e.message
        })
    }
})


module.exports = router

