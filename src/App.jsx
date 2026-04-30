import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'

function App() {
  return (
    <Routes>
      <Route path="/"         element={<Landing />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App