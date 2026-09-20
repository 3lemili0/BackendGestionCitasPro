const Notificacion = require("../models/Notificacion");

const getMisNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.find({ usuario: req.usuario._id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.status(200).json(notificaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las notificaciones.", error: error.message });
    }
};

const getContadorNoLeidas = async (req, res) => {
    try {
        const cantidad = await Notificacion.countDocuments({
            usuario: req.usuario._id,
            leida: false
        });
        res.status(200).json({ cantidad });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al contar notificaciones.", error: error.message });
    }
};

const marcarLeida = async (req, res) => {
    const { id } = req.params;
    try {
        const notificacion = await Notificacion.findOne({ _id: id, usuario: req.usuario._id });
        if (!notificacion) {
            return res.status(404).json({ mensaje: "Notificación no encontrada." });
        }
        notificacion.leida = true;
        await notificacion.save();
        res.status(200).json(notificacion);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al marcar la notificación.", error: error.message });
    }
};

const marcarTodasLeidas = async (req, res) => {
    try {
        await Notificacion.updateMany(
            { usuario: req.usuario._id, leida: false },
            { leida: true }
        );
        res.status(200).json({ mensaje: "Todas las notificaciones marcadas como leídas." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al marcar notificaciones.", error: error.message });
    }
};

const crearNotificacion = async ({ usuarioId, tipo, mensaje, citaId }) => {
    try {
        await Notificacion.create({
            usuario: usuarioId,
            tipo,
            mensaje,
            cita: citaId
        });
    } catch (error) {
        console.error("Error al crear notificación:", error.message);
    }
};

module.exports = {
    getMisNotificaciones,
    getContadorNoLeidas,
    marcarLeida,
    marcarTodasLeidas,
    crearNotificacion
};