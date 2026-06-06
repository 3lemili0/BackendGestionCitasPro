const express = require("express");
const router = express.Router();
const { definirDisponibilidad, obtenerMiDisponibilidad } = require("../controllers/disponibilidadController");
const { protegerRuta, esProfesional } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Disponibilidad
 *   description: Gestión de la disponibilidad de los profesionales (Solo para rol 'profesional').
 */

router.use(protegerRuta, esProfesional);

/**
 * @swagger
 * /api/disponibilidad:
 *   post:
 *     summary: Definir o actualizar la disponibilidad para un día de la semana
 *     tags: [Disponibilidad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diaSemana:
 *                 type: number
 *                 description: "0=Domingo, 1=Lunes, ..., 6=Sábado"
 *               horaInicio:
 *                 type: string
 *                 example: "09:00"
 *               horaFin:
 *                 type: string
 *                 example: "17:00"
 *               duracionCita:
 *                 type: number
 *                 description: "Duración de cada cita en minutos (ej: 45)"
 *     responses:
 *       201:
 *         description: Disponibilidad definida/actualizada exitosamente.
 *       403:
 *         description: Acceso denegado (no es profesional).
 */
router.post("/", definirDisponibilidad);

/**
 * @swagger
 * /api/disponibilidad:
 *   get:
 *     summary: Obtener mi propia disponibilidad
 *     tags: [Disponibilidad]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mis horarios de disponibilidad.
 *       403:
 *         description: Acceso denegado.
 */
router.get("/", obtenerMiDisponibilidad);

module.exports = router;
