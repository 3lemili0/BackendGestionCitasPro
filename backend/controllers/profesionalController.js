const Usuario = require("../models/Usuario");
const Disponibilidad = require("../models/Disponibilidad");
const Cita = require("../models/Cita");

const listarTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('nombre apellido rol');
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor al listar los usuarios." });
    }
};

const verDisponibilidad = async (req, res) => {
    const { profesionalId } = req.params;
    const { fecha } = req.query;

    if (!fecha) {
        return res.status(400).json({ mensaje: "Se requiere una fecha en formato YYYY-MM-DD." });
    }

    try {
        const fechaSeleccionada = new Date(fecha);
        const diaSemana = fechaSeleccionada.getUTCDay();

        const horario = await Disponibilidad.findOne({ profesional: profesionalId, diaSemana });

        if (!horario) {
            return res.status(200).json({ mensaje: "El profesional no tiene disponibilidad para este día.", horariosDisponibles: [] });
        }

        const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
        const finDia = new Date(`${fecha}T23:59:59.999Z`);
        const citasReservadas = await Cita.find({
            profesional: profesionalId,
            fecha: { $gte: inicioDia, $lte: finDia }
        });

        const horariosDisponibles = [];
        const { horaInicio, horaFin, duracionCita } = horario;
        
        let horaActual = new Date(`${fecha}T${horaInicio}:00.000Z`);
        const horaFinal = new Date(`${fecha}T${horaFin}:00.000Z`);

        while (horaActual < horaFinal) {
            const estaReservado = citasReservadas.some(cita => 
                new Date(cita.fecha).getTime() === horaActual.getTime()
            );

            if (!estaReservado) {
                horariosDisponibles.push(new Date(horaActual));
            }

            horaActual.setMinutes(horaActual.getMinutes() + duracionCita);
        }

        res.status(200).json({ horariosDisponibles });

    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor al calcular la disponibilidad.", error: error.message });
    }
};

module.exports = {
    listarProfesionales: listarTodosLosUsuarios,
    verDisponibilidad
};
