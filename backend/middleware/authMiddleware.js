const jwt = require("jsonwebtoken");

const protegerRuta = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // --- CAMBIO CLAVE ---
            // Ya no consultamos la base de datos.
            // Obtenemos la información del usuario directamente del token decodificado.
            if (decoded.usuario && decoded.usuario._id) {
                req.usuario = decoded.usuario; // Asignamos el objeto de usuario a la petición.
                return next(); // Permitimos el paso.
            } else {
                return res.status(401).json({ mensaje: "Token inválido, formato de datos incorrecto." });
            }

        } catch (error) {
            // Este error se dispara si el token ha expirado o está malformado.
            return res.status(401).json({ mensaje: "Token no válido o expirado." });
        }
    }

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso no autorizado, se requiere un token." });
    }
};

const esProfesional = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'profesional') {
        next();
    } else {
        res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de 'profesional'." });
    }
};

const esCliente = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'cliente') {
        next();
    } else {
        res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de 'cliente'." });
    }
};

module.exports = {
    protegerRuta,
    esProfesional,
    esCliente
};