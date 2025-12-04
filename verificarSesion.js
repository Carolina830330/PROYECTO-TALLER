// verificarSesion.js - Versión mejorada
document.addEventListener("DOMContentLoaded", () => {
  // Solo verificar en páginas que necesitan protección
  if (window.location.pathname.includes('cotizacion.html')) {
    
    // Elementos de la página
    const mensajeNoLogueado = document.getElementById("mensajeNoLogueado");
    const contenidoLogueado = document.getElementById("contenidoLogueado");
    const usuario = sessionStorage.getItem("usuario");
    
    if (!usuario) {
      // Si NO está logueado, mostrar mensaje bonito
      if (mensajeNoLogueado) mensajeNoLogueado.style.display = "block";
      if (contenidoLogueado) contenidoLogueado.style.display = "none";
      
      // También ocultar el título activo del menú si existe
      const menuActivo = document.querySelector('.menu .active');
      if (menuActivo) menuActivo.classList.remove('active');
      
    } else {
      // Si SÍ está logueado, mostrar contenido normal
      if (mensajeNoLogueado) mensajeNoLogueado.style.display = "none";
      if (contenidoLogueado) contenidoLogueado.style.display = "block";
      
      // Mostrar datos del usuario
      const usuarioData = JSON.parse(usuario);
      const nombreUsuarioElement = document.getElementById("nombreUsuario");
      if (nombreUsuarioElement) {
        nombreUsuarioElement.textContent = usuarioData.nombre;
      }
      
      // Rellenar automáticamente nombre y email si están vacíos
      const nombreInput = document.getElementById('nombre');
      const emailInput = document.getElementById('email');
      
      if (nombreInput && !nombreInput.value) {
        nombreInput.value = usuarioData.nombre;
      }
      if (emailInput && !emailInput.value) {
        emailInput.value = usuarioData.correo;
      }
    }
  }
});