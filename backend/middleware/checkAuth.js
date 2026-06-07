const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const checkAuth = async (req, res, next) => {
    let token;

    // 1. Buscamos el token en la cabecera de la petición
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extraemos el token (quitando "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificamos y decodificamos el token usando el secreto
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Buscamos al usuario en la BD con el ID del token
            //    y nos aseguramos de no traer la contraseña
            req.usuario = await Usuario.findById(decoded.uid).select('-password');

            // 5. Si el usuario existe, continuamos a la siguiente función (el controlador)
            if (req.usuario) {
                return next();
            }

        } catch (error) {
            // Si el token no es válido (expirado, malformado, etc.)
            return res.status(401).json({ mensaje: 'Token no válido o expirado.' });
        }
    }

    // Si no hay token en la cabecera, denegamos el acceso
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso no autorizado, token no proporcionado.' });
    }
};

module.exports = checkAuth;
