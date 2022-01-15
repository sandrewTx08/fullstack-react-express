const { Login } = require('../modules/model')
const bcrypt = require('bcrypt')
const body = require('body-parser').json()
const router = require('express').Router()


router.post('/', body, async (req, res) => {
    let query = await Login.findOne({
        username: req.body.username
    }).exec()
    
    if (!query) {
        await bcrypt.hash(req.body.password, Number(process.env.HASH_SALT))
            .then(async hash => {
                await Login.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash
                })
                // OK
                res.status(201).json({
                    message: `Username ${req.body.username} created with success!`
                })
            })

    } else {
        res.status(409).json({
            error: `Username ${req.body.username} already exists.`
        })
    }
})

module.exports = router
