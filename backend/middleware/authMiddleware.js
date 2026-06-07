const jwt = require("jsonwebtoken");

const protegerRuta = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.usuario && decoded.usuario._id) {
                req.usuario = decoded.usuario;
                return next();
            } else {
                return res.status(401).json({ mensaje: "Token inválido, formato de datos incorrecto." });
            }

        } catch (error) {
            return res.status(401).json({ mensaje: "Token no válido o expirado." });
        }
    }

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso no autorizado, se requiere un token." });
    }
};

// --- SECCIÓN CORREGIDA ---
// Hacemos el middleware más robusto para evitar problemas con mayúsculas o espacios.
const esProfesional = (req, res, next) => {
    // Verificamos que el usuario y el rol existan.
    // Luego, convertimos el rol a minúsculas y quitamos espacios antes de comparar.
    if (req.usuario && typeof req.usuario.rol === 'string' && req.usuario.rol.trim().toLowerCase() === 'profesional') {
        next();
    } else {
        res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de 'profesional'." });
    }
};

const esCliente = (req, res, next) => {
    // Aplicamos la misma lógica robusta aquí por consistencia.
    if (req.usuario && typeof req.usuario.rol === 'string' && req.usuario.rol.trim().toLowerCase() === 'cliente') {
        next();
    } else {
        res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de 'cliente'." });
    }
};
// --- FIN DE LA SECCIÓN CORREGIDA ---

module.exports = {
    protegerRuta,
    esProfesional,
    esCliente
};