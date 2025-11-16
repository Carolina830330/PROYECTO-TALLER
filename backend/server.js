const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 CONEXIÓN A MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",      // Si tu MySQL tiene contraseña, colócala aquí
    database: "volcosdb"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar a MySQL:", err);
        return;
    }
    console.log("✅ Conectado a MySQL");
});

// 🔹 ENDPOINT PARA REGISTRAR USUARIOS
app.post("/registro", async (req, res) => {
    const { nombre, correo, contraseña, direccion, ciudad, telefono } = req.body;

    // ✅ Validación de campos obligatorios
    if (!nombre || !correo || !contraseña || !direccion || !ciudad || !telefono) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    // ✅ Verificar correo duplicado
    const checkCorreo = "SELECT * FROM usuarios WHERE correo = ?";
    db.query(checkCorreo, [correo], async (err, results) => {
        if (err) {
            console.error("Error verificando correo:", err);
            return res.status(500).json({ success: false, message: "Error al verificar correo" });
        }

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "El correo ya está registrado" });
        }

        try {
            // ✅ Encriptar contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // ✅ Insertar usuario en la base de datos
            const sql = "INSERT INTO usuarios (nombre, correo, contraseña, direccion, ciudad, telefono) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(sql, [nombre, correo, hashedPassword, direccion, ciudad, telefono], (err, result) => {
                if (err) {
                    console.error("Error insertando usuario:", err);
                    return res.status(500).json({ success: false, message: "Error al registrar usuario" });
                }

                res.json({ success: true, message: "Usuario registrado correctamente" });
            });
        } catch (error) {
            console.error("Error hash contraseña:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    });
});

// 🔹 INICIAR SERVIDOR
app.listen(3000, () => {
    console.log("🚀 Servidor backend ejecutándose en http://localhost:3000");
});