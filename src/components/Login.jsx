import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState("")
  const toastRef = useRef(null)
  const navigate = useNavigate()

  const fetchLogin = () => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then((res) => {
      if (res.ok) return res.json()
      else return res.json().then(err => { throw new Error(err.message) })
    })
    .then((data) => {
      localStorage.setItem("token", data.message)
      navigate('/dashboard')
      console.log(data.message)
    })
    .catch((err) => setErrors(err.message))
  }

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-overlay" />

      <div className="login-card">
        <h1 className="login-title">Accedi</h1>

        <form
          className="login-form"
          onSubmit={(e) => { e.preventDefault(); fetchLogin() }}
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="login-input"
          />

          <button type="submit" className="login-btn">Accedi</button>

          {errors && <p className="login-error">{errors}</p>}
        </form>

        <p className="login-footer">
          Non hai un account?{" "}
          <span className="login-link" onClick={() => navigate('/register')}>
            Registrati
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login