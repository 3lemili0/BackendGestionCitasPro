const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // CONEXIÓN SIMPLIFICADA: Eliminamos las opciones obsoletas.
        // Mongoose ahora las maneja automáticamente.
        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = conectarDB;
