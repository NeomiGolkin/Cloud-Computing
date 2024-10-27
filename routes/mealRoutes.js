const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get('/add-meal', mealController.addMeal);
router.get('/meal-history', mealController.mealHistory);
router.get('/clinic-messages', mealController.clinicMessages);
router.get('/meal-chart', mealController.mealChart);

module.exports = router;
