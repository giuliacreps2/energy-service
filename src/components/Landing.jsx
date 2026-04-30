import { useNavigate } from 'react-router-dom'


export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="land">
      <div className="land__bg" />
      <div className="land__overlay" />

      <nav className="land__nav">
        <span className="land__logo">Energy Services</span>
        <button className="land__login" onClick={() => navigate('/login')}>
          Accedi
        </button>
      </nav>

      <div className="land__content">
        <h1 className="land__title">Energy<br />Services</h1>
        <button className="land__btn" onClick={() => navigate('/register')}>
          Inizia ora
        </button>
      </div>
    </div>
  )
}
