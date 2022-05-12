import React, {useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import Cuisine from './Cuisine';
import Home from "./Home";
import Recipe from './Recipe';
import Searched from './Searched';
import { AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';


const Pages = () => {
  const location = useLocation()
  const [auth, setAuth] = useState(false)

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:3333/users/verification',{
        method: "GET",
        headers: {Authorization: 'Bearer ' + localStorage.access_token}
      })
      const parseRes = await response.json()
      
      parseRes === true ? setAuth(true) : setAuth(false)
    } catch (error) {
      console.error(error.message)
    }
  }
  const logout = e => {
    e.preventDefault()
      localStorage.removeItem("access_token")
      setAuth(false)
  }    

  useEffect(() => {
    isAuth()
  })
  return (
    <AnimatePresence exitBeforeEnter>
      <button onClick={logout}>Log out</button>
      <Routes location={location} key={location.pathname}>
          <Route path='/' element={ !auth ? <Login setAuth={setAuth} /> : <Home />} />
          <Route path='/login' element={auth ? <Home /> : <Login setAuth={setAuth} />} />
          <Route path='/register' element={auth ? <Home /> : <Register setAuth={setAuth} />} />
          <Route path='/cuisine/:type' element={!auth ? <Login /> : <Cuisine />} />
          <Route path='/searched/:search' element={ !auth ? <Login /> : <Searched />} />
          <Route path='/recipe/:name' element={!auth ? <Login /> : <Recipe />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages