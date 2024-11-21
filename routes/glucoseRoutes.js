const express = require('express');
const router = express.Router();
const { showGlucoseChart } = require('../controllers/glucoseController'); 

router.get('/glucose-data', showGlucoseChart); 

module.exports = router;

