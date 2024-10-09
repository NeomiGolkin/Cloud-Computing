// controllers/authController.js
const { createUser, getUserByCredentials } = require('../models/userModel');

const bcrypt = require('bcrypt');

// פונקציה לרישום משתמש
async function registerUser(req, res) {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // מבצע hashing לסיסמה
        await createUser(username, hashedPassword);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).send('Error registering user');
    }
}


// פונקציה להתחברות משתמש
async function loginUser(req, res) {
    const { username, password } = req.body; // קבלת נתוני המשתמש מהגוף של הבקשה
    console.log('Request body:', req.body); // לוג לבדיקת הנתונים

    try {
        const user = await getUserByCredentials(username); // קבלת פרטי המשתמש לפי שם
        console.log('User found in DB:', user); // הדפס את פרטי המשתמש שנמצאו

        if (user) {
            const hashedPassword = user.Password; // הוצא את ה-hash של הסיסמה מהמסד
            console.log('Hashed password from DB:', hashedPassword); // הדפס את הסיסמה המוצפנת
            console.log('Entered password:', password); // הדפס את הסיסמה שהוזנה

            // בדיקה אם הסיסמה שהמשתמש הזין תואמת לסיסמה המוצפנת
            const isMatch = await bcrypt.compare(password, hashedPassword); 
            console.log('Password match:', isMatch); // לוג לבדוק אם הייתה התאמה

            if (isMatch) {
                res.send('נכנסת בהצלחה'); // הודעה על הצלחה
            } else {
                res.status(401).send('פרטי התחברות לא נכונים'); // סיסמה שגויה
            }
        } else {
            res.status(401).send('פרטי התחברות לא נכונים'); // משתמש לא קיים
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('שגיאה בהתחברות'); // טיפול בשגיאות
    }
}



module.exports = { registerUser, loginUser };
