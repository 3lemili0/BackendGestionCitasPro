const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        const url = connection.connection.host;
        const dbName = connection.connection.name;
        console.log(`
        ##################################################
        MongoDB Conectado Exitosamente.
        Servidor: ${url}
        Base de Datos: ${dbName}
        ##################################################
        `);

    } catch (error) {
        console.error("Error al conectar MongoDB:", error);
        process.exit(1);
    }
};

module.exports = conectarDB;
