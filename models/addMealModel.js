// models/addMealModel.js
const sql = require('mssql');
const fetch = require('node-fetch');
const FormData = require('form-data');

const connectionString = 'workstation id=NunuDBNunu.mssql.somee.com;packet size=4096;user id=Neomi_SQLLogin_4;pwd=gbnkx2tc8m;data source=NunuDBNunu.mssql.somee.com;persist security info=False;initial catalog=NunuDBNunu;TrustServerCertificate=True';

async function connectDB() {
    return await sql.connect(connectionString);
}

async function uploadImage(buffer) {
    const formData = new FormData();
    formData.append('image', buffer, {
        filename: 'uploaded-image.jpg',
        contentType: 'image/jpeg'
    });

    const response = await fetch('https://api.imagga.com/v2/tags', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('acc_db28fb2a837a542:39d0f2a7d36659a51318f78c59387ded').toString('base64')
        },
        body: formData 
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

async function uploadImageUrl(url) {
    const response = await fetch(`https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(url)}`, {
        headers: {
            'Authorization': 'Basic ' + Buffer.from('acc_db28fb2a837a542:39d0f2a7d36659a51318f78c59387ded').toString('base64')
        }
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

async function getNutritionalInfo(foodName) {
    const apiKey = 'CMGTdzvyl8esGFVrodXzcPfIdvuaMHEbAbRTUHsk';
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(foodName)}&api_key=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

async function getShabbatAndHolidayData() {
    const url = `https://www.hebcal.com/shabbat?cfg=json&geo=geoname&latitude=32.0853&longitude=34.7818&m=50`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data; // מחזיר את המידע הגולמי
    } catch (error) {
        console.error('Error fetching Shabbat or holiday data:', error);
        throw error;
    }
}
module.exports = { connectDB, uploadImageUrl, getNutritionalInfo, uploadImage, getShabbatAndHolidayData };
