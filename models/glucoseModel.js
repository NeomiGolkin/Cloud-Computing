// models/glucoseModel.js
const sql = require('mssql');

async function getGlucoseLevels() {
    try {
        let pool = await sql.connect('workstation id=NunuDBNunu.mssql.somee.com;packet size=4096;user id=Neomi_SQLLogin_4;pwd=gbnkx2tc8m;data source=NunuDBNunu.mssql.somee.com;persist security info=False;initial catalog=NunuDBNunu;TrustServerCertificate=True');
        console.log('Connected to database');

        let result = await pool.request().query('SELECT glucose, entry_date AS date FROM FoodGlucoseLevels WHERE glucose IS NOT NULL');
        console.log('Result of query:', result);

        return result.recordset; 
    } catch (error) {
        console.error('Error in database query:', error);
        throw error;
    }
}

module.exports = { getGlucoseLevels };