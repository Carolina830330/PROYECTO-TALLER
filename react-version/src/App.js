import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
import Volcos from './Volcos';
import Cotizacion from './Cotizacion';
import Contacto from './Contacto';
import Opiniones from './Opiniones';
import Registro from './Registro';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/volcos" element={<Volcos />} />
            <Route path="/cotizacion" element={<Cotizacion />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/opiniones" element={<Opiniones />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="*" element={<h1>Página no encontrada</h1>} />
          </Routes>
        </main>
      </Router>

      <Footer />
    </div>
  );
}

export default App;