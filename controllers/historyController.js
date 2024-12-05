const { getAllMeals } = require('../models/historyModel');

async function showMealHistory(req, res) {
    try {
        const meals = await getAllMeals();
        console.log('Meal History:', meals);
        res.json(meals); // מחזיר את הנתונים כ-JSON
    } catch (error) {
        console.error('Error fetching meal history:', error);
        res.status(500).send('Error fetching meal history');
    }
}

module.exports = { showMealHistory };
