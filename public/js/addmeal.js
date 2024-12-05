const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const urlInput = document.getElementById('urlInput');
const uploadBtn = document.getElementById('uploadBtn');
const messageDiv = document.getElementById('message');
const resultDiv = document.getElementById('result');
const sugarInfoDiv = document.getElementById('sugarInfo');

dropArea.addEventListener('click', () => fileInput.click());

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#bfa456';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#d4b862';
});


// כאשר התמונה נגררת לאזור
dropArea.addEventListener('drop', async (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#d4b862';

    const file = event.dataTransfer.files[0];  // התמונה שנגררה
    if (file) {
        await handleFileUpload(file);
    }
});

// כאשר המשתמש בוחר קובץ דרך הקלטה
fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];  // הקובץ שנבחר
    if (file) {
        await handleFileUpload(file);
    }
});

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('image', file);  // הוספת התמונה ל-FormData
    

    try {
        // שליחת הקובץ לקונטרולר בשרת שלך
        const response = await fetch('/analyze-image-move', {
            method: 'POST',
            body: formData  // שליחת ה-FormData
        });

        // עיבוד התשובה מהשרת
        const data = await response.json();
        console.log('Response from Controller:', data);

        if (data.success && data.result) {
            // הצגת התגיות שהתקבלו
            if (data.result.tags && data.result.tags.length > 0) {
                //displayTags(data.result.tags);
                messageDiv.innerText = 'Image analyzed successfully';
            } else {
                messageDiv.innerText = 'No tags found for this image';
                resultDiv.innerText = '';
            }

            // הצגת נתונים תזונתיים שהתקבלו
            if (data.result.nutritionalData) {
                const { firstTag, sugarValue, glucoseValue } = data.result.nutritionalData;
                displayNutritionalInfo(firstTag, sugarValue, glucoseValue);
            }
        } else {
            messageDiv.innerText = 'Error analyzing the image.';
        }
    } catch (error) {
        console.error('Error uploading file to server:', error);
        messageDiv.innerText = `Error: ${error.message}`;
    }
}




uploadBtn.addEventListener('click', async () => {
    console.log('Upload button clicked'); // הדפסת לוג כדי לוודא שהאירוע נתפס
    const imageUrl = urlInput.value;
    if (imageUrl) {
        try {
            console.log('Preparing to send request...');
            const response = await fetch('/analyze-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl: imageUrl // נתונים שנשלחים
                })
            });

            if (response.ok) {
                const data = await response.json(); // התשובה מהשרת
                console.log('API Response:', result); // הדפסת התשובה מה-API
                
                if (data.result && data.result.tags && data.result.tags.length > 0) {
                    //displayTags(data.result.tags);
                    messageDiv.innerText = 'Image analyzed successfully';
                    const firstTag = data.result.tags[0].tag.en;
                } else {
                    messageDiv.innerText = 'No tags found for this image';
                    resultDiv.innerText = '';
                }

                if (data.result.nutritionalData) {
                const { firstTag, sugarValue, glucoseValue } = data.result.nutritionalData;
                displayNutritionalInfo(firstTag, sugarValue, glucoseValue);
                }

            } else {
                console.error('Failed to fetch:', response.statusText);
                messageDiv.innerText = 'Error saving data to DB.';
            }
        } catch (error) {
            console.error('Request failed', error);
            messageDiv.innerText = `Error: ${error.message}`;
        }
    } else {
        messageDiv.innerText = 'Please provide an image URL.';
    }
});



function displayResult(result) {
if (result && result.tags && result.tags.length > 0) {
    resultDiv.innerHTML = '<h4>Image Tags:</h4>';
    result.tags.forEach(tag => {
        resultDiv.innerHTML += `<p>${tag.tag.en} - Confidence: ${tag.confidence.toFixed(2)}%</p>`;
    });
} else {
    resultDiv.innerHTML = '<p>No tags found for this image.</p>';
}
}


function displayTags(tags) {
    resultDiv.innerHTML = '<h4>Image Tags:</h4>';
    tags.forEach(tag => {
        resultDiv.innerHTML += `<p>${tag.tag.en} - Confidence: ${tag.confidence.toFixed(2)}%</p>`;
    });
}


function displayNutritionalInfo(foodItem, sugarValue, glucoseValue) {
    sugarInfoDiv.innerHTML = `<h4>Nutritional Information:</h4>
                            <p>Food: ${foodItem}</p>
                            <p>Sugar: ${sugarValue ? sugarValue + 'g' : 'N/A'}</p>
                            <p>Glucose: ${glucoseValue ? glucoseValue + 'g (Total Sugars)' : 'N/A'}</p>`;
}




async function handleCheckDate() {
    try {
        // קבלת התאריך מתוך האלמנט ב-HTML
        const dateContainer = document.getElementById('date-container');
        const activeDateString = dateContainer.getAttribute('data-date');
        const activeDate = new Date(activeDateString);
        console.log('Date sent to server:', {
            year: activeDate.getFullYear(),
            month: activeDate.getMonth() + 1,
            day: activeDate.getDate(),
            hour: activeDate.getHours(),
            minute: activeDate.getMinutes()
        });
        const response = await fetch('/check-date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: activeDate.getFullYear(),
                month: activeDate.getMonth() + 1, 
                day: activeDate.getDate(),
                hour: activeDate.getHours(),
                minute: activeDate.getMinutes()
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data);
            const message = data.message; // קבלת ההודעה מהשרת
            displayHolidayMessage(message); // מציג את ההודעה
        } else {
            console.error('Failed to fetch data from server');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleCheckDate(); // קריאה לפונקציה
});


function displayHolidayMessage(message) {
    const holidayMessageDiv = document.getElementById('holidayMessage');
    holidayMessageDiv.innerText = message;
    holidayMessageDiv.style.color = '#d4b862';
    holidayMessageDiv.style.fontWeight = 'bold';
}

