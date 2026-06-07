const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

// Obtener todas las citas de un usuario (cliente o profesional)
const getMisCitas = async (req, res) => {
    try {
        // NOTA: Esta es una versión simplificada sin autenticación.
        // Deberíamos obtener el ID del usuario del token, pero por ahora lo simulamos.
        // Asumiremos que el frontend envía el ID del usuario logueado.
        // Este es un punto a mejorar en el futuro con un middleware de autenticación funcional.
        
        // Simulación (esto es temporal y DEBE ser reemplazado por la autenticación real)
        // const usuarioId = req.usuario._id; 
        
        // Por ahora, para que no se rompa, devolvemos un array vacío.
        // La lógica real se implementará una vez que la app sea estable.
        res.status(200).json([]);

    } catch (error) {
        console.error("Error al obtener las citas:", error);
        res.status(500).json({ mensaje: 'Error en el servidor al obtener las citas.' });
    }
};

// Reservar una nueva cita (cliente)
const reservarCita = async (req, res) => {
    const { profesionalId, fecha, motivo } = req.body;
    // const clienteId = req.usuario._id; // Debería venir del token

    if (!profesionalId || !fecha || !motivo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    try {
        // Simulación de clienteId para que no falle
        const clienteIdSimulado = "60c72b9f9b1e8a001f8e8b45"; // ID de ejemplo

        const nuevaCita = new Cita({
            cliente: clienteIdSimulado,
            profesional: profesionalId,
            fecha: new Date(fecha),
            motivo: motivo,
            estado: 'Programada'
        });

        await nuevaCita.save();
        res.status(201).json({ mensaje: 'Cita reservada con éxito.' });
    } catch (error) {
        console.error("Error al reservar la cita:", error);
        res.status(500).json({ mensaje: 'Error en el servidor al reservar la cita.' });
    }
};

// Crear una cita manualmente (profesional)
const crearCitaManual = async (req, res) => {
    const { clienteId, fecha, motivo } = req.body;
    // const profesionalId = req.usuario._id; // Debería venir del token

    if (!clienteId || !fecha || !motivo) {
        return res.status(400).json({ mensaje: 'Cliente, fecha y motivo son obligatorios.' });
    }

    try {
        // Simulación de profesionalId para que no falle
        const profesionalIdSimulado = "60c72b9f9b1e8a001f8e8b46"; // ID de ejemplo

        const nuevaCita = new Cita({
            cliente: clienteId,
            profesional: profesionalIdSimulado,
            fecha: new Date(fecha),
            motivo: motivo,
            estado: 'Programada'
        });

        await nuevaCita.save();
        res.status(201).json({ mensaje: 'Cita creada manualmente con éxito.' });
    } catch (error) {
        console.error("Error al crear la cita manualmente:", error);
        res.status(500).json({ mensaje: 'Error en el servidor al crear la cita.' });
    }
};


// Cancelar una cita
const cancelarCita = async (req, res) => {
    const { id } = req.params;
    try {
        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'Cita no encontrada.' });
        }
        cita.estado = 'Cancelada';
        await cita.save();
        res.status(200).json({ mensaje: 'Cita cancelada con éxito.', cita });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor al cancelar la cita.' });
    }
};

// Actualizar una cita
const actualizarCita = async (req, res) => {
    const { id } = req.params;
    const { fecha, motivo } = req.body;
    try {
        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'Cita no encontrada.' });
        }
        if (fecha) cita.fecha = new Date(fecha);
        if (motivo) cita.motivo = motivo;
        await cita.save();
        res.status(200).json({ mensaje: 'Cita actualizada con éxito.', cita });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor al actualizar la cita.' });
    }
};


module.exports = {
    getMisCitas,
    reservarCita,
    cancelarCita,
    actualizarCita,
    crearCitaManual
};
