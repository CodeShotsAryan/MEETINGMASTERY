import React from 'react'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
const AppRouter = () => {
  return (
    <div>
      <Router>
        <Route path='/' Component={<Home/>} />
        <Route path='/register' Component={<Register/>} />
        <Route path='/login' Component={<Login/>} />
        

      </Router>
      
    </div>
  )
}

export default AppRouter
