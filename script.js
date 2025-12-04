document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  const mensajeBienvenida = document.getElementById("mensajeBienvenida");
  const btnLogout = document.getElementById("btnLogout");

  // Verificar si ya hay una sesión activa al cargar la página
  const usuarioGuardado = sessionStorage.getItem("usuario");
  if (usuarioGuardado && formLogin) {
    const usuario = JSON.parse(usuarioGuardado);
    mensajeBienvenida.textContent = `¡Bienvenido, ${usuario.nombre}!`;
    mensajeBienvenida.style.display = "block";
    btnLogout.style.display = "inline-block";
    formLogin.style.display = "none";
  }

  // Manejar el submit del login
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
          // Guardar usuario en sessionStorage
          sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
          
          // Mostrar mensaje de bienvenida y botón de logout
          mensajeBienvenida.textContent = `¡Bienvenido, ${data.usuario.nombre}!`;
          mensajeBienvenida.style.display = "block";
          btnLogout.style.display = "inline-block";

          // Ocultar formulario de login
          formLogin.style.display = "none";

          // Mostrar mensaje de éxito
          alert("✅ Inicio de sesión exitoso");

        } else {
          alert(data.message || "Usuario o contraseña incorrectos");
        }

      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Error de conexión con el servidor");
      }
    });
  }

  // Manejar logout - RECARGA LA PÁGINA
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      // Eliminar la sesión
      sessionStorage.removeItem("usuario");
      // Recargar la página completamente
      window.location.reload();
    });
  }
});