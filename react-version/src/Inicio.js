import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Inicio() {
  return (
    <>
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
            <li><Link to="/" className="active">Inicio</Link></li>
            <li><Link to="/volcos">Volcos</Link></li>
            <li><Link to="/cotizacion">Cotización</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/opiniones">Opiniones</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main className="contenedor-balanceado">
        <section className="hero hero-columna">
          <h1 className="titulo-principal">TALLER ROBLEDO</h1>
          <p className="descripcion">
            Somos una empresa con 20 años de trayectoria, comprometida con la calidad y el servicio.
            Somos especialistas en elaboración, reparación y adaptación de volcos.
            Ofrecemos diagnósticos precisos y un estándar de calidad que superan las exigencias del sector transporte y construcción.
          </p>
          <div className="logo-centro">
            <img src="/Logotipo.jpg" alt="Logotipo Taller Robledo" />
          </div>
        </section>

        <section className="login-contenedor">
          <h2>Iniciar Sesión</h2>
          <form className="form-login">
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" required />

            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required />

            <button type="submit" className="btn-login">Ingresar</button>
          </form>

          <p className="texto-registro">
            ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Inicio;