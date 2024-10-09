const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // הוסיפי את זה

const userRoutes = require('./routes/authRoutes'); // קישור למסלולים

const app = express();
const port = process.env.PORT || 3999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// שימוש במסלולים
app.use('/api/users', userRoutes);

// הגדרת השרת לשרת את הקובץ HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // מספקת את קובץ ה-HTML
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
