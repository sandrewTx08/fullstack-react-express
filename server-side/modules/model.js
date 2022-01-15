const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST)
    .catch(Error('Failed to connect to database.'))

module.exports = {
    Login: mongoose.model('login', mongoose.Schema({
        email: {
            type: String,
            require: true,
            unique: true
        },
        
        username: {
            type: String,
            require: true,
            unique: true
        },

        password: {
            type: String,
            require: true,
        }
    })),

}

