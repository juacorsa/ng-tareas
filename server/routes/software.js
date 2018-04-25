const express = require('express');
const router = express.Router();

const SoftwareController = require('../controllers/software');

router.post("/", SoftwareController.createSoftware);

router.get("/", SoftwareController.getSoftwares);

router.get("/:id", SoftwareController.getSoftware);

router.put("/:id", SoftwareController.updateSoftware);

module.exports = router;