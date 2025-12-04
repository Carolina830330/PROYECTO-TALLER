import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Cotizacion() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    volco: '',
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

    console.log('Datos enviados:', formData);
    setMensaje('Cotización enviada correctamente!');
    setFormData({nombre:'', email:'', volco:'', mensaje:''});
  };

  return (
    <div className="pagina">
      <header>
        <div className="logo-contenedor">
          <img src="/Logotipo.jpg" alt="Logo Taller Robledo" className="logo" />
          <div className="texto-logo">
            <span className="slogan">FABRICACIÓN DE VOLCOS</span>
            <span className="nombre">TALLER ROBLEDO</span>
          </div>
        </div>
        <nav>
          <ul className="menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/volcos">Volcos</Link></li>
            <li><Link to="/cotizacion" className="active">Cotización</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/opiniones">Opiniones</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-contenido">
        <h1>Solicitar Cotización</h1>

        <form className="form-cotizacion" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />

          <label>Correo:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Tipo de Volco:</label>
          <select name="volco" value={formData.volco} onChange={handleChange}>
            <option value="">Seleccione...</option>
            <option value="bañera">Bañera</option>
            <option value="inter">Inter</option>
            <option value="ocho cuadros">Ocho Cuadros</option>
          </select>

          <label>Detalles:</label>
          <textarea name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>

          <button type="submit" className="btn-primary">Enviar</button>
          {mensaje && <p className="mensaje-form">{mensaje}</p>}
        </form>
      </main>
    </div>
  );
}

export default Cotizacion;