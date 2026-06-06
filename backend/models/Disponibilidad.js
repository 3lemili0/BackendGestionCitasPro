const mongoose = require("mongoose");

const disponibilidadSchema = new mongoose.Schema({
    profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    diaSemana: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    horaInicio: {
        type: String,
        required: true,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "El formato de hora debe ser HH:MM"]
    },
    horaFin: {
        type: String,
        required: true,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "El formato de hora debe ser HH:MM"]
    },
    duracionCita: {
        type: Number,
        required: true,
        default: 60
    }
});

disponibilidadSchema.index({ profesional: 1, diaSemana: 1 }, { unique: true });

module.exports = mongoose.model("Disponibilidad", disponibilidadSchema);
