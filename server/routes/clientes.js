const express = require('express');
const router = express.Router();

const ClientesController = require('../controllers/clientes');

router.post("/", ClientesController.createCliente);

router.get("/", ClientesController.getClientes);

router.get("/:id", ClientesController.getCliente);

router.put("/:id", ClientesController.updateCliente);

router.get("/buscar/:termino", ClientesController.searchClientes);

module.exports = router;