const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, apellido, telefono, profesion } = req.body;
    const usuario = await Usuario.findById(req.usuario._id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    if (nombre) usuario.nombre = nombre;
    if (apellido) usuario.apellido = apellido;
    if (telefono !== undefined) usuario.telefono = telefono;
    if (profesion !== undefined && usuario.rol === 'profesional') usuario.profesion = profesion;

    await usuario.save();

    res.status(200).json({
      mensaje: "Perfil actualizado con éxito.",
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
        profesion: usuario.profesion,
        telefono: usuario.telefono,
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el perfil.", error: error.message });
  }
};

module.exports = {
  getClientes,
  actualizarPerfil, // agrégalo al module.exports existente
};