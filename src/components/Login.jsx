import { useState,useRef } from "react";

function Login({ setLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState("")
  const toastRef = useRef(null)

  const fetchLogin = () => {
    fetch("http://localhost:5003/auth/login", {
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
      console.log(data.message)
    })
    .catch((err) => {
      setErrors(err.message)
    })
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              fetchLogin()
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Accedi
            </button>
            <h2 className="text-red-600">{errors}</h2>
          </form>
                  <p className="text-center text-sm">
  Hai già un account?{" "}
  <span 
    className="text-blue-600 cursor-pointer hover:underline"
    onClick={() => setLogin(true)}
  >
    Accedi
  </span>
</p>
<p className="text-center text-sm">
  Non hai un account?{" "}
  <span 
    className="text-blue-600 cursor-pointer hover:underline"
    onClick={() => setLogin(false)}
  >
    Registrati
  </span>
</p>
        </div>
      </div>
    </>
  )
}

export default Login;