const Usuario = require("../models/Usuario");

/**
 * @description Obtiene una lista de todos los usuarios con el rol de 'cliente'.
 * @route GET /api/usuarios/clientes
 * @access Privado (requiere token de profesional)
 */
const getClientes = async (req, res) => {
  try {
    const clientes = await Usuario.find({ rol: 'cliente' }).select('nombre apellido');
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor al obtener los clientes.", error: error.message });
  }
};

module.exports = {
  getClientes,
};
