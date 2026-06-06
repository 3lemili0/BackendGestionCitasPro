const express = require("express");
const router = express.Router();
const { getClientes } = require("../controllers/usuarioController");
const { protegerRuta, esProfesional } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/usuarios/clientes:
 *   get:
 *     summary: Obtener una lista de todos los clientes (Rol: Profesional)
 *     tags: [Usuarios (Interno)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito.
 */
router.get("/clientes", protegerRuta, esProfesional, getClientes);

module.exports = router;
