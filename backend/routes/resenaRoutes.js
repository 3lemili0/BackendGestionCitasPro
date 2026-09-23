const express = require("express");
const router = express.Router();
const {
    crearResena,
    getResenasPorDoctor,
    verificarResenaDeCita
} = require("../controllers/resenaController");
const { protegerRuta } = require("../middleware/authMiddleware");

router.use(protegerRuta);

router.post("/", crearResena);
router.get("/doctor/:doctorId", getResenasPorDoctor);
router.get("/cita/:citaId", verificarResenaDeCita);

module.exports = router;