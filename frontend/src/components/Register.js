import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { host } from '../host'

const Register = () => {
  const [inputdata, setInput] = useState({ name: "", phone: "", email: "", password: "" })
  const [errordata, setError] = useState({ email: "", password: "", other: "" })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const checkEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(inputdata.email)
    const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(inputdata.password)

    if (checkEmail && passwordCheck) {
      try {
        const { data } = await axios.post(`${host}/api/signup`, inputdata)

        window.localStorage.setItem("ctoken", data.token)
        // Successful response
        setInput({ name: "", phone: "", email: "", password: "" })

        navigate("/")

      } catch (err) {
        if (err.response) {
          if (err.response.status === 409) {
            setError({ ...errordata, email: err.response.data.message, other: "Please Login" })
          } else {
            setError({ ...errordata, other: err.response.data.message })
          }
        }
      }
    } else {
      //Minimum eight characters, at least one letter and one number:
      if (!passwordCheck) {
        setError({ ...errordata, password: "password must contain minimum eight characters, at least one letter and one number" })
      }
      if (!checkEmail) {
        setError({ ...errordata, email: "please provide a valid email address" })
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    //to remove the warnings
    setError({ ...errordata, [name]: "", other: "" })

    const data = { ...inputdata, [name]: value }
    setInput(data)
  }

  return (
    <div className='register-form'>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="inp-container">
          <input type="text" name='name' required onChange={handleChange} value={inputdata.name} />
          <label>Name</label>
          <p></p>
        </div>
        <div className="inp-container">
          <input type="text" name='phone' required onChange={handleChange} value={inputdata.phone} />
          <label>Mobile Number</label>
          <p></p>
        </div>
        <div className="inp-container">
          <input type="email" name='email' required onChange={handleChange} value={inputdata.email} />
          <label>Email</label>
          <p>{errordata.email}</p>
        </div>
        <div className="inp-container">
          <input type="password" name='password' required onChange={handleChange} value={inputdata.password} />
          <label>Password</label>
          <p>{errordata.password}</p>
        </div>
        <div className='footer flex'>
          <p>{errordata.other}</p>
          <button type='submit' className='btn-primary'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
