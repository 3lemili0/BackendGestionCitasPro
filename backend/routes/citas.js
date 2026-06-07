const express = require('express');
const router = express.Router();
const { getMisCitas, reservarCita, cancelarCita, actualizarCita, crearCitaManual } = require('../controllers/citasController');
// const checkAuth = require('../middleware/checkAuth'); // Ya no lo usamos

// A partir de aquí, todas las rutas de citas estarán "abiertas" temporalmente.
// Esto nos permite verificar que la lógica funciona sin la interferencia de la autenticación.

router.get('/mis-citas', getMisCitas);
router.post('/reservar', reservarCita);
router.post('/crear-manual', crearCitaManual);
router.patch('/cancelar/:id', cancelarCita);
router.put('/actualizar/:id', actualizarCita);

module.exports = router;
