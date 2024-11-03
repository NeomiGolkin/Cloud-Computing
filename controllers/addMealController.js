// controllers/addMealController.js
const foodGlucoseModel = require('../models/addMealModel');

// פונקציה להוספת רמות סוכר למסד נתונים
async function saveNutritionalInfo(req, res) {
    const { description, sugar, glucose } = req.body;
    console.log('Data received in controller:', { description, sugar, glucose }); // בדיקת נתונים
    
    try {
        await foodGlucoseModel.addFoodGlucoseLevel(description, sugar, glucose);
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving nutritional info:', error);
        res.status(500).json({ message: 'Error saving data' });
    }
}

module.exports = { saveNutritionalInfo };
