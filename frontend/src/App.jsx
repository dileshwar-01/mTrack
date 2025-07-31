import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddMembership from './pages/AddMembership'
import About from './pages/About'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='mx-2  '>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/add' element={<AddMembership/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
