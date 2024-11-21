// models/userModel.js
const sql = require('mssql');

const connectionString = 'workstation id=NunuDBNunu.mssql.somee.com;packet size=4096;user id=Neomi_SQLLogin_4;pwd=gbnkx2tc8m;data source=NunuDBNunu.mssql.somee.com;persist security info=False;initial catalog=NunuDBNunu;TrustServerCertificate=True';

async function connectDB() {
    return await sql.connect(connectionString);
}

async function createUser(username, hashedPassword) {
    const pool = await connectDB();
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, hashedPassword) // סיסמה מוצפנת
        .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
    return result;
}

async function getUserByCredentials(username) {
    const pool = await connectDB();
    console.log('User found in DB:', username);

    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
    return result.recordset[0]; 
}

module.exports = { createUser, getUserByCredentials };