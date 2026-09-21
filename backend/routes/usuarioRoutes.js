const express = require("express");
const router = express.Router();
const { getClientes, actualizarPerfil } = require("../controllers/usuarioController");
const { protegerRuta } = require("../middleware/authMiddleware");

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
router.get("/clientes", protegerRuta, getClientes);

/**
 * @swagger
 * /api/usuarios/perfil:
 * put:
 * summary: Actualizar el perfil del usuario logueado
 * tags: [Usuarios (Interno)]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Perfil actualizado con éxito.
 */
router.put("/perfil", protegerRuta, actualizarPerfil);

module.exports = router;