import React from 'react'
import LandingPage from './components/LandingPage'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import "./App.css"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RequireAuth />} />
        <Route path='/account/:auth' element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App
