import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import RegisterB2B from './components/RegisterB2B'


function App() {
  return (
    <Routes>
      <Route path="/"         element={<Landing />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/registerb2b" element={<RegisterB2B/>} />
    </Routes>
  )
}

export default App