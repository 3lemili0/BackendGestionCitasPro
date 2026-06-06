const jwt = require('jsonwebtoken');

/**
 * Genera un JSON Web Token para la autenticación de un usuario.
 * @param {string} id - El ID del usuario.
 * @param {string} rol - El rol del usuario ('cliente' o 'profesional').
 * @returns {string} El token JWT firmado.
 */
const generarJWT = (id, rol) => {
    // Firmamos el token con el ID, el rol y la clave secreta del .env
    // El token expirará en 30 días.
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generarJWT;
