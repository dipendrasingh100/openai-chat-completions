const mongoose = require("mongoose")

const { Schema } = mongoose

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    profession: {
        type: String,
        required: true,
    },
    aoi: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User