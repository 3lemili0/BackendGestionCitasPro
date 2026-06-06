const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const protegerRuta = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await Usuario.findById(decoded.id).select("-password");

            if (!req.usuario) {
                return res.status(401).json({ mensaje: "Token no válido, usuario no encontrado." });
            }
            return next();

        } catch (error) {
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
