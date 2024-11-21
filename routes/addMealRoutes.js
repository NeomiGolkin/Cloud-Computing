// routes/addMealRoutes.js
const express = require('express');
const router = express.Router();
const mealController = require('../controllers/addMealController');
const { handleImageAnalysis, handleImageAnalysisMove, checkIfShabbatOrHolidayOnDate } = require('../controllers/addMealController');

const multer = require('multer');
const upload = multer();

router.post('/analyze-image-move', upload.single('image'), handleImageAnalysisMove);


router.post('/analyze-image', handleImageAnalysis);

router.post('/check-date', async (req, res) => {
    const { year, month, day, hour, minute } = req.body;

    try {
        const message = await checkIfShabbatOrHolidayOnDate(year, month, day, hour, minute);
        res.json({ success: true, message });
    } catch (error) {
        console.error('Error processing date:', error);
        res.status(500).json({ success: false, error: 'Error processing date' });
    }
});


module.exports = router;