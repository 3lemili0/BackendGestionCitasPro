const mongoose = require("mongoose");

const notificacionSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    tipo: {
        type: String,
        enum: ["cita_reservada", "cita_manual", "cita_cancelada"],
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    cita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cita"
    },
    leida: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Notificacion", notificacionSchema);