const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // =======================================================
        // --- CAMBIO CLAVE: USAMOS LA URL DIRECTAMENTE ---
        // =======================================================
        // En lugar de process.env.MONGO_URI, ponemos la cadena de conexión completa.
        const connectionString = "mongodb+srv://citas_user:jorgeE0801@cluster0.omkd1fj.mongodb.net/gestion_citas?retryWrites=true&w=majority";
        
        const db = await mongoose.connect(connectionString);

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = conectarDB;
