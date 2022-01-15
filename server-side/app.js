const login = require('./routes/login')
const signin = require('./routes/signin')
const verify = require('./routes/verify')

const express = require('express')
const app = express()

app.use('/api/login', login)
app.use('/api/signin', signin)
app.use('/api/verify', verify)

app.listen(3001)    

