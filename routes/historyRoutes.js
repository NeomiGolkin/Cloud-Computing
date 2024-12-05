const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/meal-history', historyController.showMealHistory);
//router.get('/clinic-messages', historyController.clinicMessages);
//router.get('/meal-chart', historyController.mealChart);


module.exports = router;
