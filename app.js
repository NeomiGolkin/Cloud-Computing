const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');


const userRoutes = require('./routes/authRoutes');
const addMealRoutes = require('./routes/addMealRoutes');
const glucoseRoutes = require('./routes/glucoseRoutes');

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/glucose-chart', (req, res) => {
    res.render('glucose-chart'); // כאן אנחנו מציגים את קובץ ה-EJS בשם glucoseChart
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth.html'));
});

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