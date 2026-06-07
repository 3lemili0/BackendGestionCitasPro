const express = require("express");
const router = express.Router();
const { getMisCitas, reservarCita, cancelarCita, actualizarCita, crearCitaManual } = require("../controllers/citasController");
const { protegerRuta, esProfesional, esCliente } = require("../middleware/authMiddleware");

// Rutas para citas
router.get("/mis-citas", protegerRuta, getMisCitas);
router.post("/reservar", protegerRuta, esCliente, reservarCita);
router.post("/crear-manual", protegerRuta, esProfesional, crearCitaManual);
router.put("/:id/cancelar", protegerRuta, cancelarCita);
router.put("/:id", protegerRuta, actualizarCita);

module.exports = router;
