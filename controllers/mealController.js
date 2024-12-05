// mealController.js
// ייבוא פונקציית התאריך מ-app.js
const { getActiveDate } = require('../app');

exports.addmeal = (req, res) => {
    const activeDate = getActiveDate(); // קבלת התאריך הפעיל
    const currentHour = activeDate.getHours(); // קבלת השעה מהתאריך הפעיל
    let title;

    // קביעת הכותרת לפי השעה
    if (currentHour >= 5 && currentHour < 12) {
        title = 'Add Breakfast';
    } else if (currentHour >= 12 && currentHour < 16) {
        title = 'Add Lunch';
    } else if (currentHour >= 16 && currentHour < 22) {
        title = 'Add Dinner';
    } else {
        title = 'Add Meal';
    }

    // רינדור הדף עם הכותרת הדינמית
    res.render('addmeal', { 
        title: title,         // הכותרת הדינמית
        holidayMessage: '',   // ערך ברירת מחדל להודעת חג/שבת
        tags: [],             // ערך ברירת מחדל לתגיות
        message: '',         
        activeDate: activeDate.toISOString()
    });
};



// controllers/authController.js
exports.authPage = (req, res) => {
    res.render('auth', { title: 'Sign In' });
};


exports.mealHistory = (req, res) => {
    res.render('mealHistory', { title: 'Meal History' });
};

exports.clinicMessages = (req, res) => {
    res.render('clinicMessages', { title: 'Clinic Messages' });
};

exports.glucoseChart = (req, res) => {
    res.render('glucose-chart', { title: 'Glucose Chart', glucoseLevels: [] }); // הוסף title ו-glucoseLevels כברירת מחדל
};
exports.mainPage = (req, res) => {
    res.render('mainPage', { title: 'Main Page' });
};

