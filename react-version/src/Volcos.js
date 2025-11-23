import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Volcos() {
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
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/volcos" className="active">Volcos</Link></li>
            <li><Link to="/cotizacion">Cotización</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/opiniones">Opiniones</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="tipos-volco">
          <h2>Tipos de Volco</h2>

          <div className="volcos-container">
            <div className="volco">
              <img src="/bañera.jpg" alt="Volco tipo bañera" />
              <h3>Tipo Bañera</h3>
              <p>
                Permite descargar el material de manera rápida y controlada,
                facilitando el trabajo en obra.
              </p>
            </div>

            <div className="volco">
              <img src="/inter.jpg" alt="Volco tipo inter" />
              <h3>Tipo Inter</h3>
              <p>
                Carrocería basculante correspondiente a la marca International.
                Diseñados para cargas pesadas y voluminosas.
              </p>
            </div>

            <div className="volco">
              <img src="/ocho cuadros.jpg" alt="Volco tipo ocho cuadros" />
              <h3>Tipo Ocho Cuadros</h3>
              <p>
                Funcional para el transporte de diversos materiales.
                Particular disposición de la caja.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Volcos;