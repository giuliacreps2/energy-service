import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const toastRef = useRef(null);
  const [errors, setErrors] = useState("");

  // stato iniziale riutilizzabile
  const initialState = {
    companyName: "",
    vatNumber: "",
    createdAt: "",
    lastContactDate: "",
    annualRevenue: "",
    certifiedEmail: "",
    phoneClient: "",
    contactEmail: "",
    contactName: "",
    contactSurname: "",
    contactPhone: "",
    companyLogo: "",
    typeClient: "SRL",

    legalAddress: {
      street: "",
      city: "",
      zip: "",
      country: ""
    },

    operationalAddress: {
      street: "",
      city: "",
      zip: "",
      country: ""
    }
  };

  const [formData, setFormData] = useState(initialState);

  const fetchTest = () => {
    const payload = {
      ...formData,
      vatNumber: Number(formData.vatNumber),
      annualRevenue: Number(formData.annualRevenue),
      phoneClient: Number(formData.phoneClient),
      contactPhone: Number(formData.contactPhone)
    };

    fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then(err => { throw new Error(err.message) });
      })
      .then(() => {
        setErrors("");

        // toast
        toastRef.current.classList.add("toast--visible");
        setTimeout(() => {
          toastRef.current.classList.remove("toast--visible");
        }, 4000);

        // reset form → pronta nuova azienda
        setFormData(initialState);
      })
      .catch((err) => setErrors(err.message));
  };

  const update = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const updateAddress = (type, field) => (e) =>
    setFormData({
      ...formData,
      [type]: {
        ...formData[type],
        [field]: e.target.value
      }
    });

  return (
    <div className="reg-page">

      {/* BACKGROUND */}
      <div className="reg-bg" />
      <div className="reg-overlay" />

      {/* NAVBAR */}
      <nav className="land__nav">
        <span className="land__logo">Energy Services</span>

        <button
          className="land__login"
          onClick={() => navigate("/login")}
        >
          Accedi
        </button>
      </nav>

      {/* TOAST */}
      <div ref={toastRef} className="reg-toast">
        Azienda registrata con successo
      </div>

      {/* CARD */}
      <div className="reg-card">

        {/* TORNA INDIETRO */}
        <span
          className="reg-link"
          style={{ alignSelf: "flex-start" }}
          onClick={() => navigate(-1)}
        >
          ← Torna indietro
        </span>

        <h1 className="reg-title">Registrazione Azienda</h1>

        <form
          className="reg-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetchTest();
          }}
        >

          <input className="reg-input" placeholder="Ragione sociale"
            value={formData.companyName}
            onChange={update("companyName")} />

          <input className="reg-input" placeholder="Partita IVA"
            value={formData.vatNumber}
            onChange={update("vatNumber")} />

          <label className="reg-label">Data creazione</label>
          <input
            className="reg-input"
            type="date"
            value={formData.createdAt}
            onChange={update("createdAt")}
          />

          <label className="reg-label">Ultimo contatto</label>
          <input
            className="reg-input"
            type="date"
            value={formData.lastContactDate}
            onChange={update("lastContactDate")}
          />
          <input className="reg-input" placeholder="Fatturato annuo"
            value={formData.annualRevenue}
            onChange={update("annualRevenue")} />

          <input className="reg-input" placeholder="PEC"
            value={formData.certifiedEmail}
            onChange={update("certifiedEmail")} />

          <input className="reg-input" placeholder="Telefono azienda"
            value={formData.phoneClient}
            onChange={update("phoneClient")} />

          <input className="reg-input" placeholder="Email contatto"
            value={formData.contactEmail}
            onChange={update("contactEmail")} />

          <div className="reg-row">
            <input className="reg-input" placeholder="Nome contatto"
              value={formData.contactName}
              onChange={update("contactName")} />

            <input className="reg-input" placeholder="Cognome contatto"
              value={formData.contactSurname}
              onChange={update("contactSurname")} />
          </div>

          <input className="reg-input" placeholder="Telefono contatto"
            value={formData.contactPhone}
            onChange={update("contactPhone")} />

          <input className="reg-input" placeholder="Logo azienda (URL)"
            value={formData.companyLogo}
            onChange={update("companyLogo")} />

          <select
            className="reg-input reg-select"
            value={formData.typeClient}
            onChange={update("typeClient")}
          >
            <option value="PA">PA</option>
            <option value="SAS">SAS</option>
            <option value="SPA">SPA</option>
            <option value="SRL">SRL</option>
          </select>

          {/* LEGAL */}
          <h3 className="reg-subtitle">Indirizzo Legale</h3>
          <input className="reg-input" placeholder="Via"
            value={formData.legalAddress.street}
            onChange={updateAddress("legalAddress", "street")} />

          <input className="reg-input" placeholder="Città"
            value={formData.legalAddress.city}
            onChange={updateAddress("legalAddress", "city")} />

          <input className="reg-input" placeholder="CAP"
            value={formData.legalAddress.zip}
            onChange={updateAddress("legalAddress", "zip")} />

          <input className="reg-input" placeholder="Paese"
            value={formData.legalAddress.country}
            onChange={updateAddress("legalAddress", "country")} />

          {/* OPERATIONAL */}
          <h3 className="reg-subtitle">Indirizzo Operativo</h3>
          <input className="reg-input" placeholder="Via"
            value={formData.operationalAddress.street}
            onChange={updateAddress("operationalAddress", "street")} />

          <input className="reg-input" placeholder="Città"
            value={formData.operationalAddress.city}
            onChange={updateAddress("operationalAddress", "city")} />

          <input className="reg-input" placeholder="CAP"
            value={formData.operationalAddress.zip}
            onChange={updateAddress("operationalAddress", "zip")} />

          <input className="reg-input" placeholder="Paese"
            value={formData.operationalAddress.country}
            onChange={updateAddress("operationalAddress", "country")} />

          {/* NUOVA AZIENDA MANUALE */}
          <button
            type="button"
            className="reg-link"
            onClick={() => setFormData(initialState)}
          >
            + Nuova azienda
          </button>

          <button type="submit" className="reg-btn">
            Registra Azienda
          </button>

          {errors && <p className="reg-error">{errors}</p>}
        </form>

        <p className="reg-footer">
          Hai già un account?{" "}
          <span className="reg-link" onClick={() => navigate("/login")}>
            Accedi
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;