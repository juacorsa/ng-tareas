const express = require('express');
const router = express.Router();

const ProveedoresController = require('../controllers/proveedores');

router.post("/", ProveedoresController.createProveedor);

router.get("/", ProveedoresController.getProveedores);

router.get("/:id", ProveedoresController.getProveedor);

router.put("/:id", ProveedoresController.updateProveedor);

router.get("/buscar/:termino", ProveedoresController.searchProveedores);

module.exports = router;