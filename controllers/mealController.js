exports.addMeal = (req, res) => {
    res.render('addMeal'); // יש ליצור דף חדש להוספת ארוחה
};

exports.mealHistory = (req, res) => {
    res.render('mealHistory'); // יש ליצור דף חדש להיסטוריות של ארוחות
};

exports.clinicMessages = (req, res) => {
    res.render('clinicMessages'); // יש ליצור דף חדש להודעות מהמרפאה
};


exports.glucoseChart = (req, res) => {
    res.render('glucose-chart', { glucoseLevels });
    //res.render('mealChart'); // יש ליצור דף חדש לגרף ארוחות
};

