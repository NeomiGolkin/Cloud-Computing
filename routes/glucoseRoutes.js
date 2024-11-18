/*const express = require('express');
const router = express.Router();
//const { showGlucoseChart } = require('../controllers/glucoseController');
const glucoseController = require('../controllers/glucoseController'); // אם אתה עובד עם controller

//router.get('/glucose-chart', showGlucoseChart);
router.get('/glucose-data', showGlucoseChart);

module.exports = router;*/
const express = require('express');
const router = express.Router();
const { showGlucoseChart } = require('../controllers/glucoseController'); // ייבוא ישיר של הפונקציה

router.get('/glucose-data', showGlucoseChart); // שימוש בפונקציה

module.exports = router;

