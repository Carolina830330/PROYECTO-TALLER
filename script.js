// === Validación de formulario de cotización ===
const cotizacionForm = document.getElementById("cotizacionForm");
if (cotizacionForm) {
  cotizacionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("¡Gracias! Su solicitud de cotización ha sido enviada.");
    cotizacionForm.reset();
  });
}

// === Sistema de calificación ===
const rating = document.getElementById("rating");
const enviarOpinion = document.getElementById("enviarOpinion");
const opinionesLista = document.getElementById("opinionesLista");

if (rating) {
  rating.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.dataset.value = i;
    star.style.fontSize = "3rem"; // ⭐ Estrellas más grandes
    star.addEventListener("click", function () {
      document.querySelectorAll("#rating span").forEach(s => s.classList.remove("active"));
      for (let j = 0; j < i; j++) {
        document.querySelectorAll("#rating span")[j].classList.add("active");
      }
      rating.dataset.selected = i;
    });
    rating.appendChild(star);
  }
}

if (enviarOpinion) {
  enviarOpinion.addEventListener("click", function () {
    const comentario = document.getElementById("comentario").value;
    const estrellas = rating.dataset.selected || 0;

    if (estrellas == 0) {
      alert("Por favor selecciona una calificación con estrellas.");
      return;
    }
    if (!comentario) {
      alert("Por favor escribe un comentario.");
      return;
    }

    // Crear el contenedor de la opinión
    const opinionBox = document.createElement("div");
    opinionBox.classList.add("opinion-box");

    // Mostrar estrellas seleccionadas
    const estrellasTexto = "⭐".repeat(estrellas);

    opinionBox.innerHTML = `
      <p><strong>${estrellasTexto}</strong></p>
      <p>${comentario}</p>
    `;

    opinionesLista.appendChild(opinionBox);

    // Resetear campos
    document.getElementById("comentario").value = "";
    rating.dataset.selected = 0;
    document.querySelectorAll("#rating span").forEach(s => s.classList.remove("active"));
  });
}