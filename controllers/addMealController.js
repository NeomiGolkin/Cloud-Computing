// controllers/addMealController.js
const sql = require('mssql'); 
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 
const { uploadImageUrl, getNutritionalInfo, connectDB, uploadImage, getShabbatAndHolidayData } = require('../models/addMealModel');

async function handleImageAnalysisMove(req, res) {

    const file = req.file; 
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        const imageData = await uploadImage(file.buffer);

        if (imageData && imageData.result && imageData.result.tags && imageData.result.tags.length > 0) {
            const firstTag = imageData.result.tags[0].tag.en;

            const nutritionalData = await getNutritionalInfo(firstTag);

            if (nutritionalData.foods && nutritionalData.foods.length > 0) {
                const sugarValue = nutritionalData.foods[0].foodNutrients.find(n =>
                    n.nutrientName.includes('Total Sugars')
                );

                const glucoseValue = sugarValue; 

                if (sugarValue) {
                    await addFoodGlucoseLevel(firstTag, sugarValue.value, glucoseValue.value);

                    return res.status(200).json({
                        success: true,
                        result: {
                            tags: imageData.result.tags,
                            nutritionalData: {
                                firstTag,
                                sugarValue: sugarValue.value,
                                glucoseValue: glucoseValue.value
                            }
                        }
                    });
                }
            }

            return res.status(200).json({
                success: true,
                result: {
                    tags: imageData.result.tags,
                    nutritionalData: {
                        firstTag,
                        sugarValue: sugarValue.value,
                        glucoseValue: glucoseValue.value
                    }
                }                    
            });
        } else {
            return res.status(400).json({ success: false, message: 'No tags found in the image' });
        }
    } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ success: false, message: 'Server error during image analysis' });
    }
}

async function handleImageAnalysis(req, res) {
    const { imageUrl } = req.body; 
    try {
        const imageData = await uploadImageUrl(imageUrl);

        console.log('Image Data:', imageData); 
        if (imageData.result && imageData.result.tags && imageData.result.tags.length > 0) {
            console.log('Tags:', imageData.result.tags);
            const firstTag = imageData.result.tags[0].tag.en;
            console.log('First Tag:', firstTag); 

            const nutritionalData = await getNutritionalInfo(firstTag);


            if (nutritionalData.foods && nutritionalData.foods.length > 0) {
                const sugarValue = nutritionalData.foods[0].foodNutrients.find(n =>
                    n.nutrientName.includes('Total Sugars')
                );

                const glucoseValue = sugarValue; 

                if (sugarValue) {
                    console.log('Adding to DB:', { firstTag, sugar: sugarValue.value, glucose: glucoseValue.value }); 
                    addFoodGlucoseLevel(firstTag, sugarValue.value, glucoseValue.value);

                    return res.status(200).json({
                        success: true,
                        result: {
                            tags: imageData.result.tags,
                            nutritionalData: {
                                firstTag,
                                sugarValue: sugarValue.value,
                                glucoseValue: glucoseValue.value
                            }
                        }                    
                    });
                    
                }
            }
        }

        res.status(404).json({ success: false, message: 'No relevant data found' });
    } catch (error) {
        console.error('Error analyzing image or saving data:', error);
        res.status(500).json({ success: false, message: 'Error processing request', error: error.message });
    }
}

async function addFoodGlucoseLevel(description, sugar, glucose) {
    const pool = await connectDB();
    const result = await pool.request()
        .input('description', sql.VarChar, description)
        .input('sugar', sql.Float, sugar)
        .input('glucose', sql.Float, glucose)
        .query('INSERT INTO FoodGlucoseLevels (description, sugar, glucose) VALUES (@description, @sugar, @glucose)');
        return result;
}

async function checkIfShabbatOrHolidayOnDate(year, month, day, hour, minute) {
    try {
        console.log('Date received in checkIfShabbatOrHolidayOnDate:', { year, month, day, hour, minute }); // בדיקה של הפרמטרים שהגיעו
        const data = await getShabbatAndHolidayData(); 
        const selectedDate = new Date(year, month - 1, day, hour, minute);
        const dayOfWeek = selectedDate.getDay();
        console.log('Calculated Selected Date:', selectedDate); // בדיקת התאריך המחושב


        const candleLightingEvent = data.items.find(item => item.category === "candles" && item.date.startsWith(selectedDate.toISOString().split('T')[0]));
        const havdalahEvent = data.items.find(item => item.category === "havdalah" && item.date.startsWith(selectedDate.toISOString().split('T')[0]));
        const holidayEvent = data.items.find(item => item.category === "holiday" && item.date.startsWith(selectedDate.toISOString().split('T')[0]));

        let message = '';

        if (holidayEvent) {
            message = 'חג היום!';
        } else if (dayOfWeek === 5 && candleLightingEvent) {
            const candleLightingTime = new Date(candleLightingEvent.date);
            if (selectedDate < candleLightingTime) {
                message = 'ערב שבת';
            } else {
                message = 'שבת היום!';
            }
        } else if (dayOfWeek === 6) {
            if (havdalahEvent) {
                const havdalahTime = new Date(havdalahEvent.date);
                if (selectedDate < havdalahTime) {
                    message = 'שבת היום!';
                } else {
                    message = 'מוצאי שבת';
                }
            } else {
                message = 'שבת היום!';
            }
        } else {
            message = 'היום זה יום חול';
        }

        return message;
    } catch (error) {
        console.error('Error processing Shabbat or holiday data:', error);
        throw error;
    }
}

module.exports = { handleImageAnalysis, addFoodGlucoseLevel, handleImageAnalysisMove, checkIfShabbatOrHolidayOnDate };