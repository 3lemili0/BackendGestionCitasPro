const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Usamos la variable de entorno MONGO_URI
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Detiene la aplicación si no se puede conectar a la BD
    }
};

module.exports = conectarDB;
