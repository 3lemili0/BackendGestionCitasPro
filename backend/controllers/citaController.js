const Cita = require("../models/Cita");
const Usuario = require("../models/Usuario");
/**
 * @description Permite a un cliente reservar una cita.
 */
const reservarCita = async (req, res) => {
    const clienteId = req.usuario._id;
    const { profesionalId, fecha, motivo } = req.body;

    if (!profesionalId || !fecha || !motivo) {
        return res.status(400).json({ mensaje: "Se requieren profesionalId, fecha y motivo." });
    }

    try {
        const nuevaCita = new Cita({
            profesional: profesionalId,
            cliente: clienteId,
            fecha,
            motivo,
            origen: 'plataforma'
        });
        const citaGuardada = await nuevaCita.save();
        res.status(201).json(citaGuardada);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: "Ya existe una cita en esa fecha y hora." });
        }
        res.status(500).json({ mensaje: "Error del servidor al reservar la cita.", error: error.message });
    }
};
/**
 * @description Permite a un profesional crear una cita manualmente.
 */
const crearCitaManual = async (req, res) => {
    const profesionalId = req.usuario._id;
    const { clienteId, fecha, motivo } = req.body;

    if (!clienteId || !fecha || !motivo) {
        return res.status(400).json({ mensaje: "Se requieren clienteId, fecha y motivo." });
    }

    try {
        const nuevaCita = new Cita({
            profesional: profesionalId,
            cliente: clienteId,
            fecha,
            motivo,
            origen: 'manual'
        });
        const citaGuardada = await nuevaCita.save();
        res.status(201).json(citaGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor al crear la cita.", error: error.message });
    }
};

/**
 * @description Permite a un profesional actualizar una cita.
 */
const actualizarCita = async (req, res) => {
    const { id } = req.params;
    const profesionalId = req.usuario._id;

    try {
        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }
        if (cita.profesional.toString() !== profesionalId.toString()) {
            return res.status(403).json({ mensaje: "Acceso denegado." });
        }
        const citaActualizada = await Cita.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(citaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la cita.", error: error.message });
    }
};


// --- ACCIONES COMUNES ---

/**
 * @description Obtiene el historial de citas del usuario logueado.
 */
const obtenerMisCitas = async (req, res) => {
    const usuarioId = req.usuario._id;
    const rol = req.usuario.rol;

    try {
        const query = (rol === 'profesional') ? { profesional: usuarioId } : { cliente: usuarioId };
        const citas = await Cita.find(query)
            .populate('profesional', 'nombre apellido profesion')
            .populate('cliente', 'nombre apellido correo')
            .sort({ fecha: -1 });
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor al obtener las citas.", error: error.message });
    }
};

/**
 * @description Obtiene una cita específica por su ID.
 */
const obtenerCitaPorId = async (req, res) => {
    const { id } = req.params;
    const usuario = req.usuario;

    try {
        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }
        const esSuCita = cita.profesional.equals(usuario._id) || cita.cliente.equals(usuario._id);
        if (!esSuCita) {
            return res.status(403).json({ mensaje: "Acceso denegado." });
        }
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la cita.", error: error.message });
    }
};

/**
 * @description Permite a un usuario (cliente o profesional) cancelar una cita.
 */
const cancelarCita = async (req, res) => {
    const { id } = req.params;
    const usuario = req.usuario;

    try {
        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }
        const esSuCita = cita.profesional.equals(usuario._id) || cita.cliente.equals(usuario._id);
        if (!esSuCita) {
            return res.status(403).json({ mensaje: "Acceso denegado." });
        }
        cita.estado = "Cancelada";
        const citaCancelada = await cita.save();
        res.status(200).json(citaCancelada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al cancelar la cita.", error: error.message });
    }
};

module.exports = {
    reservarCita,
    crearCitaManual,
    actualizarCita,
    obtenerMisCitas,
    obtenerCitaPorId,
    cancelarCita,
};
