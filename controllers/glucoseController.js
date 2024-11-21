// controllers/glucoseController.js
const { getGlucoseLevels } = require('../models/glucoseModel');

async function showGlucoseChart(req, res) {
    try {
        const glucoseLevels = await getGlucoseLevels();
        console.log('Glucose Levels:', glucoseLevels);
        res.json(glucoseLevels); 
    } catch (error) {
        console.error('Error fetching glucose levels:', error);
        res.status(500).send('Error fetching glucose levels');
    }
}

module.exports = { showGlucoseChart };