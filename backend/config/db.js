const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // La cadena de conexión que hemos estado usando
        const connectionString = "mongodb+srv://citas_user:jorgeE0801@cluster0.omkd1fj.mongodb.net/gestion_citas?retryWrites=true&w=majority";
        
        // =======================================================
        // --- CAMBIO CLAVE: FORZAMOS EL NOMBRE DE LA BASE DE DATOS ---
        // =======================================================
        // Añadimos la opción 'dbName' para asegurarnos de que Mongoose
        // siempre se conecte a 'gestion_citas', eliminando cualquier ambigüedad.
        const db = await mongoose.connect(connectionString, {
            dbName: 'gestion_citas'
        });

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = conectarDB;
