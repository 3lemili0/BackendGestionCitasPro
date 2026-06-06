const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema({
    profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    fecha: {
        type: Date,
        required: [true, "La fecha y hora de la cita son obligatorias."]
    },
    motivo: {
        type: String,
        required: [true, "El motivo de la cita es obligatorio."]
    },
    estado: {
        type: String,
        enum: ["Programada", "Completada", "Cancelada"],
        default: "Programada"
    },
    origen: {
        type: String,
        enum: ["plataforma", "manual"],
        default: "plataforma"
    }
}, {
    timestamps: true
});

citaSchema.index({ profesional: 1, fecha: 1 }, { unique: true });
citaSchema.index({ cliente: 1, fecha: 1 }, { unique: true });

module.exports = mongoose.model("Cita", citaSchema);
