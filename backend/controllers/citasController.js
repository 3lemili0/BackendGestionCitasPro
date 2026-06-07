const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

// Obtener todas las citas de un usuario (cliente o profesional)
const getMisCitas = async (req, res) => {
    try {
        const usuarioId = req.usuario._id;
        const query = (req.usuario.rol === 'profesional') ? { profesional: usuarioId } : { cliente: usuarioId };
        
        const citas = await Cita.find(query)
            .populate('cliente', 'nombre apellido')
            .populate('profesional', 'nombre apellido');
            
        res.status(200).json(citas);

    } catch (error) {
        console.error("Error al obtener las citas:", error);
        res.status(500).json({ mensaje: 'Error en el servidor al obtener las citas.' });
    }
};

// Reservar una nueva cita (cliente)
const reservarCita = async (req, res) => {
    const { profesionalId, fecha, motivo } = req.body;
    const clienteId = req.usuario._id;

    if (!profesionalId || !fecha || !motivo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    try {
        const nuevaCita = new Cita({
            cliente: clienteId,
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
    const profesionalId = req.usuario._id;

    if (!clienteId || !fecha || !motivo) {
        return res.status(400).json({ mensaje: 'Cliente, fecha y motivo son obligatorios.' });
    }

    try {
        const nuevaCita = new Cita({
            cliente: clienteId,
            profesional: profesionalId,
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
