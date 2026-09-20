const Incidencia = require("../models/Incidencia");

const crearIncidencia = async (req, res) => {
    const { tipo, asunto, descripcion, citaId } = req.body;

    if (!tipo || !asunto || !descripcion) {
        return res.status(400).json({ mensaje: "Tipo, asunto y descripción son obligatorios." });
    }
    if (tipo === "cita" && !citaId) {
        return res.status(400).json({ mensaje: "Se requiere citaId cuando el tipo es 'cita'." });
    }

    try {
        const incidencia = await Incidencia.create({
            usuario: req.usuario._id,
            tipo,
            asunto,
            descripcion,
            cita: tipo === "cita" ? citaId : undefined
        });
        res.status(201).json(incidencia);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la incidencia.", error: error.message });
    }
};

const getMisIncidencias = async (req, res) => {
    try {
        const incidencias = await Incidencia.find({ usuario: req.usuario._id })
            .populate("cita", "fecha motivo")
            .sort({ createdAt: -1 });
        res.status(200).json(incidencias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las incidencias.", error: error.message });
    }
};

const actualizarEstadoIncidencia = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ["Abierta", "En revisión", "Resuelta"];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ mensaje: "Estado inválido." });
    }

    try {
        const incidencia = await Incidencia.findOne({ _id: id, usuario: req.usuario._id });
        if (!incidencia) {
            return res.status(404).json({ mensaje: "Incidencia no encontrada." });
        }
        incidencia.estado = estado;
        await incidencia.save();
        res.status(200).json(incidencia);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la incidencia.", error: error.message });
    }
};

module.exports = {
    crearIncidencia,
    getMisIncidencias,
    actualizarEstadoIncidencia
};