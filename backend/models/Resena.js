const mongoose = require("mongoose");

const resenaSchema = new mongoose.Schema({
    cita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cita",
        required: true,
        unique: true
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comentario: {
        type: String,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Resena", resenaSchema);