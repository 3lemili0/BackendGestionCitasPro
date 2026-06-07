const Usuario = require("../models/Usuario");
const generarJWT = require("../helpers/generarJWT");

const registrarUsuario = async (req, res) => {
    const { correo, numeroIdentificacion } = req.body;
    try {
        const existeUsuario = await Usuario.findOne({ $or: [{ correo }, { numeroIdentificacion }] });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: "El correo o número de identificación ya está registrado." });
        }
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario registrado exitosamente." });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ mensaje: "Error del servidor al registrar el usuario." });
    }
};

const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ mensaje: "El usuario no existe." });
        }
        if (!(await usuario.comprobarPassword(password))) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta." });
        }

        // --- CAMBIO CLAVE ---
        // Ahora pasamos el objeto de usuario completo para generar el token.
        const token = await generarJWT(usuario);

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso.",
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                rol: usuario.rol,
            },
            token
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error del servidor al iniciar sesión." });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario,
};