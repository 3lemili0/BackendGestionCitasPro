const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const resenaRoutes = require("./routes/resenaRoutes");

dotenv.config();

const conectarDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require("./routes/authRoutes");
const citasRoutes = require("./routes/citasRoutes");
const disponibilidadRoutes = require("./routes/disponibilidadRoutes");
const profesionalesRoutes = require("./routes/profesionalesRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const notificacionRoutes = require("./routes/notificacionRoutes");
const incidenciaRoutes = require("./routes/incidenciaRoutes");

conectarDB();

const app = express();

const allowedOrigins = [
    'https://frontendgestioncitaspro.netlify.app',
];

app.use(cors({
    origin: function (origin, callback) {
        const esLocalhost = origin && /^http:\/\/localhost:\d+$/.test(origin);
        if (!origin || allowedOrigins.includes(origin) || esLocalhost) {
            callback(null, true);
        } else {
            callback(null, false); // rechaza sin lanzar error 500
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de Plataforma de Citas funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/disponibilidad", disponibilidadRoutes);
app.use("/api/profesionales", profesionalesRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/api/incidencias", incidenciaRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/resenas", resenaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    console.log(`Documentación de API disponible en http://localhost:${PORT}/api-docs`);
});