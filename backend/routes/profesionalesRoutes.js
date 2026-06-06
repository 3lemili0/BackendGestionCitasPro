const express = require("express");
const router = express.Router();
const { listarProfesionales, verDisponibilidad } = require("../controllers/profesionalController");
const { protegerRuta } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Profesionales (Vista Pública)
 *   description: Endpoints para que los clientes busquen profesionales y consulten su disponibilidad.
 */

// Todas las rutas aquí requieren que el usuario haya iniciado sesión (sea cliente o profesional)
router.use(protegerRuta);

/**
 * @swagger
 * /api/profesionales:
 *   get:
 *     summary: Listar todos los profesionales
 *     tags: [Profesionales (Vista Pública)]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Una lista de todos los profesionales registrados.
 */
router.get("/", listarProfesionales);

/**
 * @swagger
 * /api/profesionales/{profesionalId}/disponibilidad:
 *   get:
 *     summary: Ver los horarios disponibles de un profesional para una fecha específica
 *     tags: [Profesionales (Vista Pública)]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: profesionalId
 *         required: true
 *         schema: { type: "string" }
 *         description: El ID del profesional a consultar.
 *       - in: query
 *         name: fecha
 *         required: true
 *         schema: { type: "string", format: "date" }
 *         description: La fecha a consultar en formato YYYY-MM-DD.
 *     responses:
 *       200:
 *         description: Una lista de fechas y horas disponibles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horariosDisponibles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date-time
 */
router.get("/:profesionalId/disponibilidad", verDisponibilidad);

module.exports = router;
