const jwt = require('jsonwebtoken');

// La función ahora recibe el objeto de usuario completo.
const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        // Creamos un payload que contiene la información esencial del usuario.
        // Es importante que incluyamos _id, ya que el resto de la app lo usa.
        const payload = {
            _id: usuario._id,
            rol: usuario.rol,
            nombre: usuario.nombre,
        };

        // Guardamos este payload dentro de una propiedad 'usuario' en el token.
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