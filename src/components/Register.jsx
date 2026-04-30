import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    username: "", email: "", password: "",
    name: "", surname: "", avatar: "", role: "user"
  })
  const navigate = useNavigate()
  const toastRef = useRef(null)
  const [errors, setErrors] = useState("")

  const fetchTest = () => {
    fetch("http://localhost:5003/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then((res) => {
      if (res.ok) return res.json()
      return res.json().then(err => { throw new Error(err.message) })
    })
    .then(() => {
      setErrors("")
      toastRef.current.classList.add("toast--visible")
      setTimeout(() => toastRef.current.classList.remove("toast--visible"), 4000)
    })
    .catch((err) => setErrors(err.message))
  }

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value })

  return (
    <div className="reg-page">
      <div className="reg-bg" />
      <div className="reg-overlay" />

      <div ref={toastRef} className="reg-toast">
        Utente {formData.username} registrato con successo
      </div>

      <div className="reg-card">
        <h1 className="reg-title">Registrazione</h1>

        <form className="reg-form" onSubmit={(e) => { e.preventDefault(); fetchTest() }}>
          <input className="reg-input" type="text"     placeholder="Username"  required value={formData.username} onChange={update('username')} />
          <input className="reg-input" type="email"    placeholder="Email"     required value={formData.email}    onChange={update('email')} />
          <input className="reg-input" type="password" placeholder="Password"  required value={formData.password} onChange={update('password')} />
          <div className="reg-row">
            <input className="reg-input" type="text" placeholder="Nome"    required value={formData.name}    onChange={update('name')} />
            <input className="reg-input" type="text" placeholder="Cognome" required value={formData.surname} onChange={update('surname')} />
          </div>
          <input className="reg-input" type="text" placeholder="URL Avatar" required value={formData.avatar} onChange={update('avatar')} />

          <select className="reg-input reg-select" value={formData.role} onChange={update('role')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="reg-btn">Registrati</button>
          {errors && <p className="reg-error">{errors}</p>}
        </form>

        <p className="reg-footer">
          Hai già un account?{" "}
          <span className="reg-link" onClick={() => navigate('/login')}>Accedi</span>
        </p>
      </div>
    </div>
  )
}

export default Register