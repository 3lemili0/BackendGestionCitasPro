const express = require("express");
const router = express.Router();
const {
    reservarCita,
    crearCitaManual,
    obtenerMisCitas,
    obtenerCitaPorId,
    actualizarCita,
    cancelarCita
} = require("../controllers/citaController");
const { protegerRuta, esCliente, esProfesional } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Gestión de citas (Endpoints para Clientes y Profesionales).
 */

/**
 * @swagger
 * /api/citas/reservar:
 *   post:
 *     summary: (Cliente) Reservar una cita con un profesional
 *     tags: [Citas]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Reserva' }
 *     responses:
 *       201: { description: "Cita reservada." }
 */
router.post("/reservar", protegerRuta, esCliente, reservarCita);

/**
 * @swagger
 * /api/citas/manual:
 *   post:
 *     summary: (Profesional) Crear una cita manualmente para un cliente
 *     tags: [Citas]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CitaManual' }
 *     responses:
 *       201: { description: "Cita creada." }
 */
router.post("/manual", protegerRuta, esProfesional, crearCitaManual);

/**
 * @swagger
 * /api/citas/mis-citas:
 *   get:
 *     summary: (Ambos) Obtener mi historial de citas
 *     tags: [Citas]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: "Lista de citas del usuario." }
 */
router.get("/mis-citas", protegerRuta, obtenerMisCitas);

/**
 * @swagger
 * /api/citas/{id}:
 *   get:
 *     summary: (Ambos) Obtener una cita específica por su ID
 *     tags: [Citas]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: "id", required: true, schema: { type: "string" } }]
 *     responses:
 *       200: { description: "Detalles de la cita." }
 *       403: { description: "No tienes permiso para ver esta cita." }
 *       404: { description: "Cita no encontrada." }
 */
router.get("/:id", protegerRuta, obtenerCitaPorId);

/**
 * @swagger
 * /api/citas/{id}:
 *   put:
 *     summary: (Profesional) Actualizar una cita
 *     tags: [Citas]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: "id", required: true, schema: { type: "string" } }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ActualizarCita' }
 *     responses:
 *       200: { description: "Cita actualizada." }
 */
router.put("/:id", protegerRuta, esProfesional, actualizarCita);

/**
 * @swagger
 * /api/citas/{id}/cancelar:
 *   patch:
 *     summary: (Ambos) Cancelar una cita
 *     tags: [Citas]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: "id", required: true, schema: { type: "string" } }]
 *     responses:
 *       200: { description: "Cita cancelada." }
 */
router.patch("/:id/cancelar", protegerRuta, cancelarCita);

/**
 * @swagger
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       properties:
 *         profesionalId: { type: string }
 *         fecha: { type: string, format: date-time }
 *         motivo: { type: string }
 *     CitaManual:
 *       type: object
 *       properties:
 *         clienteId: { type: string }
 *         fecha: { type: string, format: date-time }
 *         motivo: { type: string }
 *     ActualizarCita:
 *       type: object
 *       properties:
 *         fecha: { type: string, format: date-time }
 *         motivo: { type: string }
 *         estado: { type: string, enum: ["Programada", "Completada"] }
 */
module.exports = router;
