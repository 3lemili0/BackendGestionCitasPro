const Usuario = require("../models/Usuario");

/**
 * @description Obtiene una lista de todos los usuarios con el rol de 'cliente'.
 * @route GET /api/usuarios/clientes
 * @access Privado (requiere token de profesional o cliente autenticado)
 */
const getClientes = async (req, res) => {
  try {
    // --- CORRECCIÓN CLAVE ---
    // Agregamos 'rol' dentro del .select() junto a 'nombre' y 'apellido'.
    // De esta forma, el frontend recibirá el campo 'rol' y no borrará la lista
    // al ejecutar el filtro .filter(u => u.rol === 'cliente')
    const clientes = await Usuario.find({ rol: { $regex: /^cliente$/i } })
        .select('nombre apellido rol');

    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error del servidor al obtener los clientes.",
      error: error.message
    });
  }
};

module.exports = {
  getClientes,
};