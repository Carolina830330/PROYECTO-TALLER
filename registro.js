document.addEventListener("DOMContentLoaded", () => {
    
    const formRegistro = document.getElementById("formRegistro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", async (e) => {

            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;
            const direccion = document.getElementById("direccion").value;
            const ciudad = document.getElementById("ciudad").value;
            const telefono = document.getElementById("telefono").value;

            try {
                const response = await fetch("http://localhost:3000/registro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre,
                        correo,
                        contrasena,
                        direccion,
                        ciudad,
                        telefono
                    })
                });

                const data = await response.json();

                if (data.success) {
                    alert("Usuario registrado correctamente");
                    window.location.href = "index.html";  // Redirige al login
                } else {
                    alert(data.message || "Error en el registro");
                }

            } catch (error) {
                alert("Error al conectar con el servidor");
                console.error(error);
            }

        });
    }

});