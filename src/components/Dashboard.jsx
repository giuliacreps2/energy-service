import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Filter from './Filter'
 
export default function Dashboard() {
  const navigate = useNavigate()
  const url = "http://localhost:5003/clients/details"
 
  const [error, setError] = useState("")
  const [load, setLoad] = useState(false)
  const [client, setClient] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
 
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      if (res.ok) return res.json()
      return res.json().then(err => { throw new Error(err.message) })
    })
    .then((data) => {
        console.log(data.content)
      setClient(data.content)
      setLoad(true)
    })
    .catch((err) => {
      setError(err.message)
    })
  }, [])
 
 
  return (
    <div className="dash">
  <div className="dash__bg" />
  <div className="dash__overlay" />

  <Filter/>

  <nav className="dash__nav">
    <span className="dash__logo">Energy Services</span>
    <div className="dash__nav-right">
      <span className="dash__nav-label">Dashboard</span>
      <button className="dash__logout" onClick={() => { navigate('/') }}>
        Aggiungi cliente
      </button>
      <button className="dash__logout" onClick={() => { navigate('/login') }}>
        Esci
      </button>
    </div>
  </nav>

  <main className="dash__main">
    <div className="dash__header">
      <h1 className="dash__title">Clienti</h1>
    </div>

    {load && client.map((c, i) => (
      <div className="dash__card" key={c.b2bClientID ?? i} style={{ animationDelay: `${i * 0.07}s` }}>
        <div className="dash__card-header">
          <p className="dash__company">{c.companyName}</p>
          <span className="dash__badge">{c.typeClient}</span>
        </div>
        <div className="dash__card-grid">
          <p className="dash__field"><span className="dash__label">P. IVA</span><span className="dash__value">{c.vatNumber}</span></p>
          <p className="dash__field"><span className="dash__label">Fatturato</span><span className="dash__value dash__value--green">{c.annualRevenue}</span></p>
          <p className="dash__field"><span className="dash__label">PEC</span><span className="dash__value">{c.certifiedEmail}</span></p>
          <p className="dash__field"><span className="dash__label">Referente</span><span className="dash__value">{c.contactName} {c.contactSurname}</span></p>
          <p className="dash__field"><span className="dash__label">Email</span><span className="dash__value">{c.contactEmail}</span></p>
          <p className="dash__field"><span className="dash__label">Tel. referente</span><span className="dash__value">{c.contactPhone}</span></p>
          <p className="dash__field"><span className="dash__label">Tel. azienda</span><span className="dash__value">{c.phoneClient}</span></p>
          <p className="dash__field"><span className="dash__label">Sede</span><span className="dash__value">{c.legalAddress?.street} {c.legalAddress?.number}, {c.legalAddress?.locality}</span></p>
          <p className="dash__field"><span className="dash__label">Creato</span><span className="dash__value">{c.createdAt}</span></p>
          <p className="dash__field"><span className="dash__label">Ultimo contatto</span><span className="dash__value">{c.lastContactDate}</span></p>
        </div>
      </div>
    ))}
  </main>
</div>
  )
}