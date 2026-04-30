import { useEffect, useState } from "react"

function Filter() {
   const navigate = useNavigate()
   const [error, setError] = useState("")
   const [load, setLoad] = useState(false)
   const [clients, setClients] = useState([])
   const [toaltPages, setTotalPages] = useState(0)

const[filtri, setFiltri] = useState({
 companyName: '',
    name: '',
    contactName: '',
    contactSurname: '',
    vatNumber: '',
    contactPhone: '',
    annualRevenue: '',
    createdAt: '',
    lastContact: '',
    sortBy: 'companyName',
    direction: 'ASC',
    page: 0,
    size: 10  
  })

  const aggiorna = (campo) => (e) =>
    setFiltri(prev => ({ ...prev, [campo]: e.target.value, page: 0}))

  const resetFiltri = () => setFiltri({
     companyName: '', name: '', contactName: '', contactSurname: '',
    vatNumber: '', contactPhone: '', annualRevenue: '',
    createdAt: '', lastContact: '',
    sortBy: 'companyName', direction: 'ASC', page: 0, size: 10
  })

  useEffect(() => {
    const token = localStorage.getItem('token')

    const params = new URLSearchParams()

     if (filtri.companyName)   params.append('companyName',   filtri.companyName)
    if (filtri.name)          params.append('name',          filtri.name)
    if (filtri.contactName)   params.append('contactName',   filtri.contactName)
    if (filtri.contactSurname)params.append('contactSurname',filtri.contactSurname)
    if (filtri.vatNumber)     params.append('vatNumber',     filtri.vatNumber)
    if (filtri.contactPhone)  params.append('contactPhone',  filtri.contactPhone)
    if (filtri.annualRevenue) params.append('annualRevenue', filtri.annualRevenue)
    if (filtri.createdAt)     params.append('createdAt',     filtri.createdAt)
    if (filtri.lastContact)   params.append('lastContact',   filtri.lastContact)

    params.append('page',      filtri.page)
    params.append('size',      filtri.size)
    params.append('sortBy',    filtri.sortBy)
    params.append('direction', filtri.direction)

    setLoad(false)

    fetch(`http://localhost:5003/clients/details?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(err => { throw new Error(err.message) })
    })
    .then(data => {
      setClients(data.content)
      setTotalPages(data.totalPages)
      setLoad(true)
    })
    .catch(err => setError(err.message))

  }, [filtri])

  return (

    <div className="dash">
      <div className="dash__bg" />
      <div className="dash__overlay" />

      <nav className="dash__nav">
        <span className="dash__logo">Energy Services</span>
        <div className="dash__nav-right">
          <span className="dash__nav-label">Dashboard</span>
          <button className="dash__logout" onClick={() => navigate('/')}>Aggiungi cliente</button>
          <button className="dash__logout" onClick={() => navigate('/login')}>Esci</button>
        </div>
      </nav>

      <main className="dash__main">
        <div className="dash__header">
          <h1 className="dash__title">Clienti</h1>
        </div>
  
  <div className="dash__filters">

          <input className="dash__filter-input" type="text"
            placeholder="Nome azienda" value={filtri.companyName}
            onChange={aggiorna('companyName')} />

          <input className="dash__filter-input" type="text"
            placeholder="Nome" value={filtri.name}
            onChange={aggiorna('name')} />

          <input className="dash__filter-input" type="text"
            placeholder="Nome referente" value={filtri.contactName}
            onChange={aggiorna('contactName')} />

          <input className="dash__filter-input" type="text"
            placeholder="Cognome referente" value={filtri.contactSurname}
            onChange={aggiorna('contactSurname')} />

          <input className="dash__filter-input" type="number"
            placeholder="P. IVA" value={filtri.vatNumber}
            onChange={aggiorna('vatNumber')} />

          <input className="dash__filter-input" type="number"
            placeholder="Tel. referente" value={filtri.contactPhone}
            onChange={aggiorna('contactPhone')} />

          <input className="dash__filter-input" type="number"
            placeholder="Fatturato €" value={filtri.annualRevenue}
            onChange={aggiorna('annualRevenue')} />

          <input className="dash__filter-input" type="date"
            title="Creato il" value={filtri.createdAt}
            onChange={aggiorna('createdAt')} />

          <input className="dash__filter-input" type="date"
            title="Ultimo contatto" value={filtri.lastContact}
            onChange={aggiorna('lastContact')} />


 <select className="dash__filter-input" value={filtri.sortBy}
            onChange={aggiorna('sortBy')}>
            <option value="companyName">Ordina: Nome azienda</option>
            <option value="annualRevenue">Ordina: Fatturato</option>
            <option value="createdAt">Ordina: Data creazione</option>
            <option value="lastContact">Ordina: Ultimo contatto</option>
          </select>

          <select className="dash__filter-input" value={filtri.direction}
            onChange={aggiorna('direction')}>
            <option value="ASC">↑ Crescente</option>
            <option value="DESC">↓ Decrescente</option>
          </select>

          <button className="dash__filter-reset" onClick={resetFiltri}>
            ✕ Reset
          </button>
        </div>

        {/* ── CARDS ── */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {load && clients.map((c, i) => (
          <div className="dash__card" key={c.b2bClientID ?? i}
            style={{ animationDelay: `${i * 0.07}s` }}>
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

        {load && clients.length === 0 && (
          <p className="dash__empty">Nessun cliente trovato.</p>
        )}

        {/* ── PAGINAZIONE ── */}
        {load && totalPages > 1 && (
          <div className="dash__pagination">
            <button
              className="dash__page-btn"
              disabled={filtri.page === 0}
              onClick={() => setFiltri(prev => ({ ...prev, page: prev.page - 1 }))}
            >← Precedente</button>

            <span className="dash__page-info">
              Pagina {filtri.page + 1} di {totalPages}
            </span>

            <button
              className="dash__page-btn"
              disabled={filtri.page >= totalPages - 1}
              onClick={() => setFiltri(prev => ({ ...prev, page: prev.page + 1 }))}
            >Successiva →</button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Filter