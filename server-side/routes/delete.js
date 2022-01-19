const { Login } = require('../modules/model')
const body = require('body-parser').json()
const router = require('express').Router()


router.delete('/', body, async (req, res) => {
    let query = await Login.findByIdAndDelete(req.body._id)

    if (query) {
        res.json({
            message: `${query.username} was deleted.`
        })
    
    } else {
        res.json({
            error: 'User not found.' 
        })
    }
})


module.exports = router
