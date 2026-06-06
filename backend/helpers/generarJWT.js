const jwt = require('jsonwebtoken');

// =======================================================
// --- CORRECCIÓN: AÑADIMOS EL ROL AL PAYLOAD DEL TOKEN ---
// =======================================================
const generarJWT = (uid, rol) => {
    // El payload ahora contiene tanto el id como el rol
    const payload = {
        usuario: {
            id: uid,
            rol: rol
        }
    };

    return new Promise((resolve, reject) => {
        // Firmamos el nuevo payload
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
