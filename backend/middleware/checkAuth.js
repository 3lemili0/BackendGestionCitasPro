const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // =======================================================
            // --- CAMBIO DE DEPURACIÓN: MOSTRAMOS EL ID ---
            // =======================================================
            console.log('Buscando usuario con UID del token:', decoded.uid);

            req.usuario = await Usuario.findById(decoded.uid).select('-password');

            if (req.usuario) {
                console.log('Usuario encontrado:', req.usuario.nombre);
                return next();
            } else {
                // Si no se encuentra el usuario, devolvemos un error claro.
                console.log('Usuario NO encontrado en la base de datos con ese UID.');
                return res.status(401).json({ mensaje: 'Token no válido, usuario no encontrado.' });
            }

        } catch (error) {
            console.error('Error al verificar el token:', error.message);
            return res.status(401).json({ mensaje: 'Token no válido o expirado.' });
        }
    }

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso no autorizado, token no proporcionado.' });
    }
};

module.exports = checkAuth;
