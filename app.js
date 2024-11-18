const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');

const userRoutes = require('./routes/authRoutes');
const addMealRoutes = require('./routes/addMealRoutes');
const glucoseRoutes = require('./routes/glucoseRoutes');
const glucoseController = require('./controllers/glucoseController'); // הוספת ייבוא

const app = express();
const port = process.env.PORT || 5222;

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout'); // layout.ejs
//app.use('/glucose-chart', glucoseChartRoutes);

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);
app.use('/api/glucose', glucoseRoutes);
app.use('/api', addMealRoutes);

// ראוט שמחזיר את נתוני הגלוקוז כ-JSON
/*app.get('/api/glucose/glucose-data', (req, res) => {
    const glucoseData = [
        { glucose: 12.2, date: '2024-11-03T09:03:24.270Z' },
        { glucose: 32.6, date: '2024-11-17T08:08:22.200Z' },
        // שאר הנתונים שלך...
    ];

    // החזרת המידע כ-JSON
    res.json(glucoseData);
});*/

//app.get('/glucose-chart', glucoseController.showGlucoseChart); // תיקון הראוט

app.get('/glucose-chart', (req, res) => {
    res.render('glucose-chart'); // כאן אנחנו מציגים את קובץ ה-EJS בשם glucoseChart
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth.html'));
});

 /*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth.html'));
});*/

app.get('/mainPage', (req, res) => {
    res.render('mainPage');
});

app.get('/mealChart', (req, res) => {
    res.render('mealChart');
});

app.get('/add-meal', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addmeal.html'));
});

app.post('/api/add-meal', (req, res) => {
    console.log('POST request received at /api/add-meal');
    console.log('Data:', req.body);
    res.status(200).send('Data received');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


















/*const express = require('express');

const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts'); // הגדרת המשתנה expressLayouts
const path = require('path');
const session = require('express-session'); // הוספת express-session

const userRoutes = require('./routes/authRoutes');
const addMealRoutes = require('./routes/addMealRoutes');
const glucoseRoutes = require('./routes/glucoseRoutes');



const app = express(); // הוספת שורת קוד זו
const port = process.env.PORT || 5222;

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
//app.use('/api', glucoseRoutes); // כל הבקשות ל-api יפנו ל-glucoseRoute
// הוספת ה-route ל-glucoseRoutes
app.use('/api/glucose', glucoseRoutes);

// שימוש במסלולים
app.use('/api/users', userRoutes);
app.use('/api', addMealRoutes);

app.get('/glucose-chart', glucoseController.showGlucoseChart);



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
app.get('/add-meal', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addmeal.html')); // מציין את המיקום המדויק של הקובץ
});

// קבלת הנתונים
app.post('/api/add-meal', (req, res) => {
    console.log('POST request received at /api/add-meal');
    console.log('Data:', req.body);
    // כאן יבוא עיבוד הנתונים ושמירתם בבסיס הנתונים
    res.status(200).send('Data received');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});*/






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