const login = require('./routes/login')
const signin = require('./routes/signup')
const verify = require('./routes/verify')

const express = require('express')
const app = express()

app.use('/api/login', login)
app.use('/api/signup', signin)
app.use('/api/verify', verify)

app.listen(3001)    

