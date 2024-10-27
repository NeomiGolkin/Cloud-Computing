const express = require('express');

const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts'); // הגדרת המשתנה expressLayouts
const path = require('path');
const session = require('express-session'); // הוספת express-session

const userRoutes = require('./routes/authRoutes');

const app = express(); // הוספת שורת קוד זו
const port = process.env.PORT || 3008;

// שימוש ב-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // הגדרת קובץ ה-layout

// קביעת EJS כתבנית
app.set('view engine', 'ejs'); // הוסף שורה זו
app.set('views', path.join(__dirname, 'views')); // קביעת מיקום תיקיית ה-views

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// הוספת middleware של session
app.use(session({
    secret: 'your-secret-key', // שנה את המפתח הזה
    resave: false,
    saveUninitialized: true,
}));

// שימוש במסלולים
app.use('/api/users', userRoutes);


// הגדרת השרת לשרת את הקובץ HTML לדף ההתחברות
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // דף ההתחברות
});

// הגדרת השרת לשרת את דף ה-main
app.get('/mainPage', (req, res) => {
    res.render('mainPage'); // שימוש ב-res.render במקום sendFile
});

// נתיב לראות גרף של ארוחה
app.get('/mealChart', (req, res) => {
    res.render('mealChart'); // דף addMeal.ejs
});

// הגדרת השרת לשרת את דף ה-main
app.get('/addmeal', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addmeal.html')); // מציין את המיקום המדויק של הקובץ
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});






/*const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3008;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts); // שימוש בפריסות
app.set('layout', 'layout'); // קובץ פריסת ברירת מחדל

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('mainPage'); // רינדור הדף הראשי
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/



/*const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // הוסיפי את זה

const userRoutes = require('./routes/authRoutes'); // קישור למסלולים

const port = process.env.PORT || 3999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// שימוש במסלולים
app.use('/api/users', userRoutes);

// הגדרת השרת לשרת את הקובץ HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mainPage.ejs')); // מספקת את קובץ ה-HTML
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/