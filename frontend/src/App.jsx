import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddMembership from './pages/AddMembership'

const App = () => {
  return (
    <div className='mx-2'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/add' element={<AddMembership/>} />
      </Routes>
    </div>
  )
}

export default App
