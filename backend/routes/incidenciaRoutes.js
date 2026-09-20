const express = require("express");
const router = express.Router();
const {
    crearIncidencia,
    getMisIncidencias,
    actualizarEstadoIncidencia
} = require("../controllers/incidenciaController");
const { protegerRuta } = require("../middleware/authMiddleware");

router.use(protegerRuta);

router.post("/", crearIncidencia);
router.get("/mis-incidencias", getMisIncidencias);
router.put("/:id/estado", actualizarEstadoIncidencia);

module.exports = router;