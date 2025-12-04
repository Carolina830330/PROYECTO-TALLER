import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    direccion: '',
    ciudad: '',
    telefono: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key].trim() === '') {
        setMensaje('Todos los campos son obligatorios.');
        return;
      }
    }

    console.log('Datos enviados:', formData);
    setMensaje('✅ Registro exitoso');

    setFormData({
      nombre: '',
      correo: '',
      contraseña: '',
      direccion: '',
      ciudad: '',
      telefono: ''
    });
  };

  return (
    <div className="registro-page">
      <header className="header">
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
            <li><Link to="/cotizacion">Cotización</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/opiniones">Opiniones</Link></li>
            <li><Link to="/registro" className="active">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-registro">
        <div className="auth-container">
          <h1 className="titulo-registro">Registro de Usuario</h1>

          <form className="form-registro" onSubmit={handleSubmit}>
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
            />

            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Calle 10 #15-23"
            />

            <label>Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Tu ciudad"
            />

            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="3001234567"
            />

            <button type="submit" className="btn-primary">
              REGISTRAR CUENTA
            </button>

            {mensaje && <p className="mensaje-form">{mensaje}</p>}
          </form>

          <p className="auth-link">
            ¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Registro;