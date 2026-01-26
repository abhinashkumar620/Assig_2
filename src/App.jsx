import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ContectForm from './components/ContectForm'
import Auth from './components/Auth'

const App = () => {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="/create-ad" element={<ContectForm />} />
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
