exports.addMeal = (req, res) => {
    res.render('addMeal'); // יש ליצור דף חדש להוספת ארוחה
};

exports.mealHistory = (req, res) => {
    res.render('mealHistory'); // יש ליצור דף חדש להיסטוריות של ארוחות
};

exports.clinicMessages = (req, res) => {
    res.render('clinicMessages'); // יש ליצור דף חדש להודעות מהמרפאה
};

exports.mealChart = (req, res) => {
    res.render('mealChart'); // יש ליצור דף חדש לגרף ארוחות
};
