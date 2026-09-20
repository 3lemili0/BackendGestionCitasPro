const express = require("express");
const router = express.Router();
const {
    getMisNotificaciones,
    getContadorNoLeidas,
    marcarLeida,
    marcarTodasLeidas
} = require("../controllers/notificacionController");
const { protegerRuta } = require("../middleware/authMiddleware");

router.use(protegerRuta);

router.get("/mis-notificaciones", getMisNotificaciones);
router.get("/contador", getContadorNoLeidas);
router.put("/:id/leer", marcarLeida);
router.put("/marcar-todas-leidas", marcarTodasLeidas);

module.exports = router;