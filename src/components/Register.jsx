import { use, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register(){
      const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    avatar: "",
    role: "user"
  })
    const navigate = useNavigate()
  const toastRef = useRef(null)
  const [registered,setRegisetred] = useState(false)
  const [errors,setErrors] = useState("")
  const [id,setId] = useState("")
    const url = "http://localhost:5003/auth/register"
    const fetchTest = () => {
        fetch(url,{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((res)=>{
            if(res.ok){
                setRegisetred(true)
                return res.json();
            } return res.json().then(err => { throw new Error(err.message) })
        })
        .then((data)=>{
            setErrors("")
            createdUser()
            setId(data.id)
            // setTimeout(() => {
            //  navigate('/login')
            // }, 2000);
        })
        .catch((err)=>{
            setErrors(err.message)
        })
    }
    const createdUser = ()=>{
        toastRef.current.classList.add("opacity-100")
        setTimeout(() => {
          toastRef.current.classList.remove("opacity-100") 
        }, 4000);
    }
    return ( 
        <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200 relative">
        <div ref={toastRef} className="absolute bottom-10 right-10 border-2 border-green-600 p-2 rounded-lg opacity-0 transition duration-1000">
            <h1>user {formData.username} is now registered</h1>
        </div>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Registrazione</h1>
        <form 
        className="flex flex-col gap-4"
        onSubmit={(e)=>{
             e.preventDefault()
        }}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange= {(e)=>{
                setFormData({
                    ...formData,
                    username:e.target.value
                })
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={
                (e)=>{
                setFormData({
                    ...formData,
                    email:e.target.value
                })
            }
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={
                (e)=>{
                setFormData({
                    ...formData,
                    password:e.target.value
                })
            }
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Nome"
            required
            value={formData.name}
            onChange={
                (e)=>{
                setFormData({
                    ...formData,
                    name:e.target.value
                })
            }
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="surname"
            placeholder="Cognome"
            required
            value={formData.surname}
            onChange={
                (e)=>{
                setFormData({
                    ...formData,
                    surname:e.target.value
                })
            }
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="avatar"
            placeholder="URL Avatar"
            required
            value={formData.avatar}
            onChange={
                (e)=>{
                setFormData({
                    ...formData,
                    avatar:e.target.value
                })
            }
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            required
            value={formData.role}
            onChange={
                (e)=>{
                setFormData({
                    ...formData,
                    role:e.target.value
                })
            }
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            onClick={()=>{
                fetchTest();
            }}
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Registrati
          </button>
          <h2 className="text-red-600">{errors}</h2>
        </form>
                <p className="text-center text-sm">
  Hai già un account?{" "}
  <span 
    className="text-blue-600 cursor-pointer hover:underline"
    onClick={() => navigate('/login')}
  >
    Accedi
  </span>
</p>
      </div>
    </div>
   
        </>
    )
}
export default Register;