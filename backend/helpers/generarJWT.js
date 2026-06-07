const jwt = require('jsonwebtoken');

// =======================================================
// --- CORRECCIÓN DEFINITIVA: AÑADIMOS EL ROL AL PAYLOAD ---
// =======================================================
const generarJWT = (uid, rol) => {
    // El payload ahora contiene un objeto 'usuario' con id y rol.
    // Esto es crucial para que el middleware de autenticación funcione correctamente.
    const payload = {
        usuario: {
            id: uid,
            rol: rol
        }
    };

    return new Promise((resolve, reject) => {
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
