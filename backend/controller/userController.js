const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")
const User = require("../models/User")

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.find({ email })
    if (!user.length) {
        res.status(404)
        return res.send({ message: "User not found! Please register" })
    }

    const checkPassword = bcrypt.compareSync(password, user[0]["password"])
    if (!checkPassword) {
        res.status(401)
        return res.send({ message: "Wrong Password!" })
    }

    const token = generateToken(user[0])
    res.status(200)
    return res.send({ message: "You are loggedin", token })
}

const signup = async (req, res) => {
    const userData = req.body
    const user = await User.find({ email: userData.email })  //return undefined if not found

    if (user.length) {
        res.status(409)
        return res.json({ message: "Email is already registered" })
    }

    const hashPassword = bcrypt.hashSync(userData.password, 10)
    userData.password = hashPassword
    try {
        var newuser = await User.create(userData)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    const token = generateToken({ email: newuser.email, aoi: newuser.aoi, id: newuser.id })
    res.status(201)
    res.send({ message: "You are successfully Registered", token })
}

module.exports = { login, signup }