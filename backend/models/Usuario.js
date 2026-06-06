const mongoose = require('mongoose');
// CAMBIO CLAVE: Usamos 'bcryptjs' en lugar de 'bcrypt'
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    numeroIdentificacion: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['cliente', 'profesional'],
        default: 'cliente'
    },
    profesion: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Middleware para hashear la contraseña ANTES de guardarla en la BD
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método personalizado para comprobar la contraseña del usuario
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
