const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id: usuario._id,
            rol: usuario.rol,
            nombre: usuario.nombre,
        };
        jwt.sign({ usuario: payload }, process.env.JWT_SECRET, {
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