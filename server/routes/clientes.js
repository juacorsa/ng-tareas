const express = require('express');
const router = express.Router();

const ClientesController = require('../controllers/clientes');

router.post("/", ClientesController.createCliente);

router.get("/", ClientesController.getClientes);

router.get("/:id", ClientesController.getCliente);

router.put("/:id", ClientesController.updateCliente);

module.exports = router;