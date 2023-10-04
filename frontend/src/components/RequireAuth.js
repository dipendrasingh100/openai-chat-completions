import React from 'react'
import { Navigate } from 'react-router-dom'
import decodeToken from '../decodeToken'
import Home from './Home'

const RequireAuth = () => {
    const res = decodeToken()
    return (
        <>
            {
                res.loggedin ? <Home/> :
                    <Navigate to='/account/login' />
            }
            {/* <Home /> */}
        </>
    )
}

export default RequireAuth
