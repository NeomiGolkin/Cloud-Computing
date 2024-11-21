const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get('/add-meal', mealController.addmeal);
router.get('/meal-history', mealController.mealHistory);
router.get('/clinic-messages', mealController.clinicMessages);
router.get('/glucose-chart', mealController.glucoseChart);
router.get('/mainPage', mealController.mainPage);
router.get('/auth', mealController.authPage);


module.exports = router;
