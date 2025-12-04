import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Opiniones() {
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState(0);

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
            <li><Link to="/volcos">Volcos</Link></li>
            <li><Link to="/cotizacion">Cotización</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/opiniones" className="active">Opiniones</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-opiniones">
        <div className="contenedor-opiniones">
          <h1 className="titulo-opiniones">Califique Nuestro Servicio</h1>

          <div className="rating">
            {[1, 2, 3, 4, 5].map((valor) => (
              <span
                key={valor}
                onClick={() => setRating(valor)}
                className={valor <= rating ? 'active' : ''}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="comentario-opinion"
            placeholder="Escriba su opinión..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            style={{ backgroundColor: '#ffffff' }}
          ></textarea>

          <button className="btn-opinion">ENVIAR OPINIÓN</button>
        </div>
      </main>
    </>
  );
}

export default Opiniones;