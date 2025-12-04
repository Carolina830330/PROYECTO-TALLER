import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        setMensaje('Todos los campos son obligatorios.');
        return;
      }
    }

    setMensaje('Mensaje enviado correctamente!');
    setFormData({nombre:'', email:'', mensaje:''});
  };

  return (
    <div className="pagina">
      <header>
        <div className="logo-contenedor">
          <img src="/Logotipo.jpg" alt="Logo" className="logo" />
          <div className="texto-logo">
            <span className="slogan">FABRICACIÓN DE VOLCOS</span>
            <span className="nombre">TALLER ROBLEDO</span>
          </div>
        </div>
        <nav>
          <ul className="menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/volcos">Volcos</Link></li>
            <li><Link to="/cotizacion">Cotización</Link></li>
            <li><Link to="/contacto" className="active">Contacto</Link></li>
            <li><Link to="/opiniones">Opiniones</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-contenido">
        <h1>Contáctenos</h1>

        <p><strong>Teléfono:</strong> 3148805733</p>
        <p><strong>Dirección:</strong> Carrera 3 Norte #55-04</p>
        <p><strong>Ciudad:</strong> Cartago, Valle</p>

        <form className="form-contacto" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange}/>
          <input type="email" name="email" placeholder="Tu correo" value={formData.email} onChange={handleChange}/>
          <textarea name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
          <button className="btn-primary">ENVIAR</button>
          {mensaje && <p className="mensaje-form">{mensaje}</p>}
        </form>
      </main>
    </div>
  );
}

export default Contacto;