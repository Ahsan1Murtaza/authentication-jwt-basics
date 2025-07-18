const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: [3, 'Username must be of atleast 3 characters']
    },

    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: [13, 'Email must be of atleast 13 characters']
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [5,  'Password must be of atleast 5 characters']
    }
})

const user = mongoose.model('users', userSchema)

module.exports = user