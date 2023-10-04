import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'


const LandingPage = () => {
    const [status, setStatus] = useState(true)

    return (
        <div className="main-container flex center">
            <div className="container">
                <div className="header">
                    <div className={`login ${status ? "wh" : ""}`} onClick={() => setStatus(true)}>Login</div>
                    <div className={`register ${status ? "" : "wh"}`} onClick={() => setStatus(false)}>Register</div>
                </div>
                {
                    status ?
                        <Login /> :
                        <Register />
                }
            </div>
        </div>
    )
}

export default LandingPage
