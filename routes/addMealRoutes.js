// routes/addMealRoutes.js
const express = require('express');
const router = express.Router();
const mealController = require('../controllers/addMealController');

// עדכון הנתיב כאן
router.post('/add-meal', (req, res, next) => {
    console.log('Route /api/add-meal accessed - Passing to controller');
    mealController.saveNutritionalInfo(req, res, next);
});

module.exports = router;

/*const express = require('express');
const router = express.Router();
const mealController = require('../controllers/addMealController');

// עדכון הנתיב כאן
router.post('/api/add-meal', mealController.saveNutritionalInfo);

module.exports = router;*/