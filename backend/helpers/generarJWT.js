const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        // El payload solo contiene el id del usuario
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h' // El token expirará en 8 horas
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
