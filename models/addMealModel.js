// models/addMealModel.js
const sql = require('mssql');

const connectionString = 'workstation id=NunuDBNunu.mssql.somee.com;packet size=4096;user id=Neomi_SQLLogin_4;pwd=gbnkx2tc8m;data source=NunuDBNunu.mssql.somee.com;persist security info=False;initial catalog=NunuDBNunu;TrustServerCertificate=True';

async function connectDB() {
    return await sql.connect(connectionString);
}

async function addFoodGlucoseLevel(description, sugar, glucose) {
    const pool = await connectDB();
    
    console.log(`Inserting into DB: 
      Description: ${description}, 
      Sugar: ${sugar}, 
      Glucose: ${glucose}`);
      
    const result = await pool.request()
        .input('description', sql.VarChar, description)
        .input('sugar', sql.Float, sugar)
        .input('glucose', sql.Float, glucose)
        .query('INSERT INTO FoodGlucoseLevels (description, sugar, glucose) VALUES (@description, @sugar, @glucose)');
    
    return result;
}

module.exports = { addFoodGlucoseLevel };