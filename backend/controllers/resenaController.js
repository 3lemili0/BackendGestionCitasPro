const Resena = require("../models/Resena");
const Cita = require("../models/Cita");

// Crear una reseña (solo el paciente dueño de la cita, y solo si está completada)
const crearResena = async (req, res) => {
    const { citaId, calificacion, comentario } = req.body;

    if (!citaId || !calificacion) {
        return res.status(400).json({ mensaje: "Se requieren citaId y calificación." });
    }
    if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ mensaje: "La calificación debe estar entre 1 y 5." });
    }

    try {
        const cita = await Cita.findById(citaId);
        if (!cita) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }
        if (cita.cliente.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ mensaje: "Acceso denegado." });
        }
        if (cita.estado !== 'Completada') {
            return res.status(400).json({ mensaje: "Solo puedes calificar citas completadas." });
        }

        const resena = await Resena.create({
            cita: citaId,
            paciente: req.usuario._id,
            doctor: cita.profesional,
            calificacion,
            comentario
        });

        res.status(201).json(resena);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: "Esta cita ya fue calificada." });
        }
        res.status(500).json({ mensaje: "Error al crear la reseña.", error: error.message });
    }
};

// Obtener las reseñas de un doctor específico + su promedio
const getResenasPorDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const resenas = await Resena.find({ doctor: doctorId })
            .populate('paciente', 'nombre apellido')
            .sort({ createdAt: -1 });

        const promedio = resenas.length > 0
            ? resenas.reduce((suma, r) => suma + r.calificacion, 0) / resenas.length
            : 0;

        res.status(200).json({
            promedio: Math.round(promedio * 10) / 10,
            total: resenas.length,
            resenas
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las reseñas.", error: error.message });
    }
};

// Verifica si una cita ya tiene reseña (útil para el frontend antes de mostrar el botón de calificar)
const verificarResenaDeCita = async (req, res) => {
    const { citaId } = req.params;
    try {
        const resena = await Resena.findOne({ cita: citaId });
        res.status(200).json({ tieneResena: !!resena, resena });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al verificar la reseña.", error: error.message });
    }
};

module.exports = {
    crearResena,
    getResenasPorDoctor,
    verificarResenaDeCita
};