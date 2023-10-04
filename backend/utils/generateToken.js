const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    return jwt.sign(
            {
                userid: user.id,
                email: user.email,
                aoi: user.aoi
            },
            process.env.SECRET_KEY,
            { expiresIn: "30m" }
        );
}

module.exports = generateToken