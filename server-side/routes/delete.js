const { Login } = require('../modules/model')
const body = require('body-parser').json()
const router = require('express').Router()

router.delete('/', body, async (req, res) => {
    await Login.findByIdAndDelete(req.body._id)

    res.json({
        message: `${req.body.username} was deleted.`
    })
})

module.exports = router