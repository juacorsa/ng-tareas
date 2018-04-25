const express = require('express');
const router = express.Router();

const LicenciasController = require('../controllers/licencias');

router.post("/", LicenciasController.createLicencia);

router.get("/", LicenciasController.getLicencias);

router.get("/:id", LicenciasController.getLicencia);

router.put("/:id", LicenciasController.updateLicencia);

router.delete("/:id", LicenciasController.deleteLicencia);

module.exports = router;