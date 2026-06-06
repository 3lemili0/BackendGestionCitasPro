const Disponibilidad = require("../models/Disponibilidad");

const definirDisponibilidad = async (req, res) => {
    const profesionalId = req.usuario._id;
    const { diaSemana, horaInicio, horaFin, duracionCita } = req.body;

    if (diaSemana === undefined || !horaInicio || !horaFin) {
        return res.status(400).json({ mensaje: "Se requieren diaSemana, horaInicio y horaFin." });
    }

    try {
        const disponibilidad = await Disponibilidad.findOneAndUpdate(
            { profesional: profesionalId, diaSemana: diaSemana },
            { horaInicio, horaFin, duracionCita },
            { new: true, upsert: true }
        );

        res.status(201).json({ mensaje: `Disponibilidad para el día ${diaSemana} definida/actualizada.`, disponibilidad });

    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor al definir la disponibilidad.", error: error.message });
    }
};

const obtenerMiDisponibilidad = async (req, res) => {
    const profesionalId = req.usuario._id;

    try {
        const miDisponibilidad = await Disponibilidad.find({ profesional: profesionalId }).sort('diaSemana');
        res.status(200).json(miDisponibilidad);
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor al obtener la disponibilidad.", error: error.message });
    }
};

module.exports = {
    definirDisponibilidad,
    obtenerMiDisponibilidad
};
