const { Login } = require('../modules/model')
const router = require('express').Router()
const body = require('body-parser').json()


router.get('/', body, async (req, res) => {
    let query = await Login.find()
    res.json({
        query
    })
})

module.exports = router
