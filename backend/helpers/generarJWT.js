const jwt = require('jsonwebtoken');

// Corregimos el payload para que use 'id' en lugar de 'uid',
// alineándolo con lo que el authMiddleware espera.
const generarJWT = (id) => { // Cambiamos el nombre del parámetro por claridad
    return new Promise((resolve, reject) => {
        const payload = { id }; // --- ¡ESTA ES LA CORRECCIÓN CLAVE! ---

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                console.error('Error al generar el token:', err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = generarJWT;