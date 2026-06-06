const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const conectarDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// --- Importación de todas las rutas ---
const authRoutes = require("./routes/authRoutes");
const citasRoutes = require("./routes/citas");
const disponibilidadRoutes = require("./routes/disponibilidadRoutes");
const profesionalesRoutes = require("./routes/profesionalesRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Conectar a la Base de Datos
conectarDB();

const app = express();

// =======================================================
// --- CONFIGURACIÓN DE CORS (DEFINITIVA Y ROBUSTA) ---
// =======================================================
const allowedOrigins = [
  'https://frontendgestioncitaspro.netlify.app', // Tu URL de Netlify
  'http://localhost:4200' // Mantenemos localhost para tu desarrollo local
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitimos peticiones sin origen (como Postman) y las de nuestra lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por la política de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Permitimos todos los métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitimos las cabeceras necesarias
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de Plataforma de Citas funcionando");
});

// --- Endpoints de la API ---
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
