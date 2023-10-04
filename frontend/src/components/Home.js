import React, { useState } from 'react'
import "./home.css"
import "axios"
import axios from 'axios'
import { host } from '../host'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])

    const navigate = useNavigate()

    const token = localStorage.getItem("ctoken")

    const sendRequest = async (msg) => {
        try {
            return await axios.post(`${host}/completions`, { prompt: msg }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
        } catch (err) {
            return err.response
        }
    }

    const handleInput = (msg) => {
        const divel = document.createElement("div")
        divel.className = "block ques"
        divel.innerText = msg
        const main = document.getElementsByClassName("main-container")[0]
        main.appendChild(divel)
    }

    const handleResponse = (res) => {
        const divel = document.createElement("div")
        divel.className = "block"
        for (let sentence of res) {
            const p = document.createElement("p")
            p.textContent = sentence
            divel.appendChild(p)
        }
        const main = document.getElementsByClassName("main-container")[0]
        main.appendChild(divel)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (chat.length === 0) {
            const li = document.createElement("li")
            li.textContent = "New Chat"
            li.className = "selected"
            const ul = document.getElementsByTagName("ul")[0]
            ul.appendChild(li)
        }

        handleInput(message)
        const divel = document.createElement("div")
        divel.className = "block"
        divel.textContent = "Responding..."
        const main = document.getElementsByClassName("main-container")[0]
        main.appendChild(divel)
        setMessage("")
        const res = await sendRequest(message)
        main.removeChild(divel)

        if (res.status === 401 || res.status === 400) {
            console.log(res.data);
            return navigate("/account/login")
        }
        else if(res.status === 500){
            alert('you have reached your free api limit')
        }else{
            console.log(res.data);
            const { content } = res.data.choices[0].message
    
            const completion = content.replace(/\n/g, " ")
    
            const resarry = completion.split("  ")
    
            handleResponse(resarry)
    
            setChat([...chat, { "prompt": message, "completion": resarry }])
        }
    }

    const handleNewChat = () => {
        setChat([])
    }
    return (
        <div className='app-container'>
            <aside className='sidebar'>
                <h2>Q&A</h2>
                <button onClick={handleNewChat}>New Chat</button>
                <ul>
                </ul>
            </aside>
            <div className="chatBox">
                <header>
                    <h1>OpenChat</h1>
                </header>
                <main>
                    <div>
                        <div className="main-container">
                        </div>
                    </div>

                    <div className="user-inp" onSubmit={handleSubmit}>
                        <form>
                            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder='ask me anything..'/>
                            <button type='submit'>&gt;</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home
