const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    const token = jwt.sign(
        {
            userid: user.id,
            email: user.email,
            aoi: user.aoi
        },
        process.env.SECRET_KEY,
        { expiresIn: "2m" }
    )
    return token
}

module.exports = generateToken