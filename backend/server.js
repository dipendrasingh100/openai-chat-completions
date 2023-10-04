const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const User = require("./models/User")
const verifyToken = require("./middleware/tokenVarification")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*",
}))

const dbUrl = "mongodb+srv://dipendrasingh:Dipendra1234@cluster0.nw3urnu.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 8000

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use("/api", userRouter)


app.post("/completions", verifyToken, async (req, res) => {
    const { prompt } = req.body
    let { userid, aoi } = req.user

    const user = await User.find({ _id: userid })

    if (!user.length) {
        return res.status(500).send("id not found")
    }

    aoi = user[0]["aoi"]
    const template = `I'm interested in ${aoi}. Please provide me with information about ${prompt}?`

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: template }],
                max_tokens: 100,
            })
        })

        if (response.status === 200) {
            const data = await response.json()
            const completion = data.choices[0].message.content

            res.send(data)
        } else {
            res.status(500).send("you have reached your free api limit")
        }
    } catch (error) {
        console.log(error);
    }
})
