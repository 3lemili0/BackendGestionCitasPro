const express = require("express");
const router = express.Router();
const { registrarUsuario, loginUsuario } = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para el registro e inicio de sesión de usuarios (Clientes y Profesionales).
 */

/**
 * @swagger
 * /api/auth/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     description: Crea una cuenta para un cliente o un profesional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               numeroIdentificacion:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [cliente, profesional]
 *               profesion:
 *                 type: string
 *                 description: "Requerido solo si el rol es 'profesional'."
 *               telefono:
 *                 type: string
 *                 description: "Opcional."
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Datos inválidos o el correo/identificación ya están en uso.
 */
router.post("/registro", registrarUsuario);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     description: Autentica a un usuario (cliente o profesional) y devuelve un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales no válidas.
 */
router.post("/login", loginUsuario);

module.exports = router;
