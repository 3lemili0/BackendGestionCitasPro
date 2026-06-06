const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const conectarDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// --- Rutas de la Aplicación ---
const authRoutes = require("./routes/authRoutes");
const citasRoutes = require("./routes/citas");
const disponibilidadRoutes = require("./routes/disponibilidadRoutes");
const profesionalesRoutes = require("./routes/profesionalesRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes"); // <-- Ruta añadida

conectarDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de Plataforma de Citas funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/disponibilidad", disponibilidadRoutes);
app.use("/api/profesionales", profesionalesRoutes);
app.use("/api/usuarios", usuarioRoutes); // <-- Ruta integrada

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    console.log(`Documentación de API disponible en http://localhost:${PORT}/api-docs`);
});
