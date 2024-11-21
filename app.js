const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const userRoutes = require('./routes/authRoutes');
const addMealRoutes = require('./routes/addMealRoutes');
const mealRoutes = require('./routes/mealRoutes');
const glucoseRoutes = require('./routes/glucoseRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5005;

// הגדרת EJS כמנוע התבניות
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// שימוש ב-express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // תבנית ראשית layout.ejs

// קבצים סטטיים
app.use(express.static(path.join(__dirname, 'public')));

// הגדרות body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// הגדרת session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// הגדרת הנתיבים
app.use('/api/users', userRoutes);
app.use('/api/glucose', glucoseRoutes);
app.use('/api', addMealRoutes);
app.use('/', mealRoutes);
app.use(authRoutes);

// נתיב ראשי
app.get('/', (req, res) => {
    res.render('auth', { title: 'Login', active: '' });
});
// app.get('/auth', (req, res) => {
//     res.render('auth', { title: 'Sign In' });
// });


// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
