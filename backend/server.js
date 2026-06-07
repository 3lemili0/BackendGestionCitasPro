const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const conectarDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// --- Importación de todas las rutas ---
const authRoutes = require("./routes/authRoutes");
const citasRoutes = require("./routes/citasRoutes");
const disponibilidadRoutes = require("./routes/disponibilidadRoutes");
const profesionalesRoutes = require("./routes/profesionalesRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Conectar a la Base de Datos
conectarDB();

const app = express();

// --- Configuración de CORS ---
const allowedOrigins = [
  'https://frontendgestioncitaspro.netlify.app',
  'http://localhost:4200'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por la política de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de Plataforma de Citas funcionando");
});

// =======================================================
// --- ENDPOINTS DE LA API (VERSIÓN COMPLETA Y CORREGIDA) ---
// =======================================================
app.use("/api/auth", authRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/disponibilidad", disponibilidadRoutes);
app.use("/api/profesionales", profesionalesRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Ruta para la documentación de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    console.log(`Documentación de API disponible en http://localhost:${PORT}/api-docs`);
});
