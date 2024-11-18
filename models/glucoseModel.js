// models/glucoseModel.js
const sql = require('mssql');

async function getGlucoseLevels() {
    try {
        let pool = await sql.connect('workstation id=NunuDBNunu.mssql.somee.com;packet size=4096;user id=Neomi_SQLLogin_4;pwd=gbnkx2tc8m;data source=NunuDBNunu.mssql.somee.com;persist security info=False;initial catalog=NunuDBNunu;TrustServerCertificate=True');
        console.log('Connected to database');

        let result = await pool.request().query('SELECT glucose, entry_date AS date FROM FoodGlucoseLevels WHERE glucose IS NOT NULL');
        console.log('Result of query:', result);

        return result.recordset; // החזר את כל הרשומות עם ערכים תקינים
    } catch (error) {
        console.error('Error in database query:', error);
        throw error;
    }
}

module.exports = { getGlucoseLevels };

/*
async function getGlucoseLevels() {
    try {
        let pool = await sql.connect('workstation id=NunuDBNunu.mssql.somee.com;packet size=4096;user id=Neomi_SQLLogin_4;pwd=gbnkx2tc8m;data source=NunuDBNunu.mssql.somee.com;persist security info=False;initial catalog=NunuDBNunu;TrustServerCertificate=True');
        console.log('Connected to database'); // הדפסה אם החיבור הצליח

        let result = await pool.request().query('SELECT glucose, measurement_date AS date FROM FoodGlucoseLevels WHERE glucose IS NOT NULL');
        console.log('Result of query:', result); // הדפס את תוצאות השאילתה

        if (result.recordset.length === 0) {
            console.log('No glucose data found in the database'); // אם אין נתונים
        }

        return result.recordset.map(record => record.glucose); // החזר את הערכים
    } catch (error) {
        console.error('Error in database query:', error); // הדפס אם יש שגיאה
        throw error;
    }
}

module.exports = { getGlucoseLevels };*/