const mongoose = require("mongoose");

const incidenciaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    tipo: {
        type: String,
        enum: ["cita", "general"],
        required: true
    },
    cita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cita"
    },
    asunto: {
        type: String,
        required: [true, "El asunto es obligatorio."]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria."]
    },
    estado: {
        type: String,
        enum: ["Abierta", "En revisión", "Resuelta"],
        default: "Abierta"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Incidencia", incidenciaSchema);