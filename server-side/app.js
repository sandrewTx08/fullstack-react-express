const login = require('./routes/login')
const signin = require('./routes/signup')
const verify = require('./routes/verify')
const dashboard = require('./routes/dashboard')
const _delete = require('./routes/delete')
const app = require('express')()

app.use('/api/login', login)
app.use('/api/signup', signin)
app.use('/api/verify', verify)
app.use('/api/dashboard', dashboard)
app.use('/api/delete', _delete)

app.listen(3001)

