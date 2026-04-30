import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [login, setLogin] = useState(false)

  return (
    <>
    {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/>}
    </>
  )
}

export default App
