import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { host } from '../host'

const Login = () => {
    const [inputdata, setInput] = useState({ email: "", password: "" })
    const [errordata, setError] = useState({ email: "", password: "" })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const checkEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(inputdata.email)

        if (checkEmail) {
            try {
                const { data } = await axios.post(`${host}/api/login`, inputdata, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                localStorage.setItem("ctoken", data.token)

                navigate("/")

            } catch (err) {
                // You can still access error responses if available
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            setError({ ...errordata, password: err.response.data.message })
                            break;
                        case 404:
                            setError({
                                ...errordata, email: err.response.data.message
                            })
                            break;
                        default:
                            console.log("Error Response Data:", err.response.data.message);
                            break;
                    }
                }
            }
        } else {
            setError({ ...errordata, email: "please provide a valid email address" })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        //to remove the warnings
        setError({ ...errordata, [name]: "" })

        const data = { ...inputdata, [name]: value }
        setInput(data)
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <div className="inp-container">
                    <input type="email" name='email' required value={inputdata.email} onChange={handleChange} />
                    <label>Email</label>
                    <p>{errordata.email}</p>
                </div>
                <div className="inp-container">
                    <input type="password" name='password' required value={inputdata.password} onChange={handleChange} />
                    <label>Password</label>
                    <p>{errordata.password}</p>
                </div>
                <div className="footer flex">
                    <Link to="/forgot_password">Forgot Password</Link>
                    <button type="submit" className='btn-primary'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
