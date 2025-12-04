const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");  // ¡IMPORTANTE: 'promise' version!
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =================================================
// 🔹 CONEXIÓN A MYSQL (CON POOL - MÁS ESTABLE)
// =================================================
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "volcosdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de conexión
pool.getConnection()
    .then(connection => {
        console.log("✅ Conectado a MySQL");
        connection.release();
        
        // Test de tabla
        return pool.execute("SELECT COUNT(*) as total FROM usuarios2");
    })
    .then(([results]) => {
        console.log("✅ Tabla 'usuarios2' existe. Registros:", results[0].total);
    })
    .catch(err => {
        console.error("❌ Error en conexión:", err.message);
    });

// =================================================
// 🔹 REGISTRO DE USUARIOS
// =================================================
app.post("/registro", async (req, res) => {
    console.log("📥 Datos recibidos en /registro:", req.body);
    
    const { nombre, correo, contrasena, direccion, ciudad, telefono } = req.body;

    if (!nombre || !correo || !contrasena || !direccion || !ciudad || !telefono) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        // Verificar si el correo ya existe
        const checkCorreo = "SELECT * FROM usuarios2 WHERE correo = ?";
        console.log("🔍 Ejecutando consulta:", checkCorreo, "con correo:", correo);
        
        const [results] = await pool.execute(checkCorreo, [correo]);
        
        console.log("📊 Resultados de verificación:", results);
        
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "El correo ya está registrado" });
        }

        // Encriptar la contraseña
        console.log("🔐 Encriptando contraseña...");
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const sql = `
            INSERT INTO usuarios2 (nombre, correo, contrasena, direccion, ciudad, telefono)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        console.log("📝 Ejecutando INSERT:", sql);
        console.log("📝 Con datos:", [nombre, correo, "***CONTRASEÑA***", direccion, ciudad, telefono]);

        await pool.execute(sql, [nombre, correo, hashedPassword, direccion, ciudad, telefono]);
        
        console.log("✅ Usuario registrado exitosamente");
        res.json({ success: true, message: "Usuario registrado correctamente" });

    } catch (error) {
        console.error("❌ Error en registro:", error);
        console.error("❌ Mensaje completo:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Error al registrar usuario: " + error.message 
        });
    }
});

// =================================================
// 🔐 LOGIN DE USUARIOS
// =================================================
app.post("/login", async (req, res) => {
    console.log("📥 Datos recibidos en /login:", req.body);
    
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM usuarios2 WHERE correo = ?";
        console.log("🔍 Ejecutando login con:", sql, "email:", email);
        
        const [results] = await pool.execute(sql, [email]);
        
        console.log("📊 Resultados login:", results);
        
        if (results.length === 0) {
            return res.json({ success: false, message: "Usuario no encontrado" });
        }

        const usuario = results[0];

        // Comparar contraseña ingresada vs la encriptada
        const coincide = await bcrypt.compare(password, usuario.contrasena);

        if (coincide) {
            console.log("✅ Login exitoso para:", usuario.nombre);
            return res.json({
                success: true,
                message: "Inicio de sesión correcto",
                usuario: {
                    nombre: usuario.nombre,
                    correo: usuario.correo
                }
            });
        } else {
            console.log("❌ Contraseña incorrecta");
            return res.json({ success: false, message: "Contraseña incorrecta" });
        }

    } catch (error) {
        console.error("❌ Error en login:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error en el servidor: " + error.message 
        });
    }
});

// =================================================
// 🚀 INICIAR SERVIDOR
// =================================================
app.listen(3000, () => {
    console.log("🚀 Servidor backend ejecutándose en http://localhost:3000");
    console.log("========================================");
});