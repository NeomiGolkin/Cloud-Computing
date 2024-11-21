// mealController.js
exports.addmeal = (req, res) => {
    res.render('addmeal', { 
        title: 'Add Meal', 
        holidayMessage: '',  // ערך ברירת מחדל להודעת חג/שבת
        tags: [],            // ערך ברירת מחדל לתגיות
        message: ''          // ערך ברירת מחדל להודעות
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

