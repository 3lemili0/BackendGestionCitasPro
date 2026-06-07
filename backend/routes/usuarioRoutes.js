const express = require("express");
const router = express.Router();
const { getClientes } = require("../controllers/usuarioController");
const { protegerRuta } = require("../middleware/authMiddleware"); // <-- Quitamos 'esProfesional' de aquí

/**
 * @swagger
 * /api/usuarios/clientes:
 * get:
 * summary: Obtener una lista de todos los clientes
 * tags: [Usuarios (Interno)]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de clientes obtenida con éxito.
 */
// CORREGIDO: Ahora cualquier usuario logueado con token válido puede consultar la lista
router.get("/clientes", protegerRuta, getClientes);

module.exports = router;