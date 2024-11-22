$(document).ready(function() {
    // בורר צבעים
        $('#colorPicker').on('input', function() {
            const color = $(this).val(); // קבלת הצבע שנבחר
            updateChartWithNewColor(color); // עדכון הגרף עם הצבע החדש
        });

        // פונקציה לעדכון הגרף עם הצבע החדש
        function updateChartWithNewColor(color) {
            if (chartInstance) {
                // שינוי צבע הקו של הגרף
                chartInstance.data.datasets[0].borderColor = color;
                chartInstance.data.datasets[0].backgroundColor = color + '99'; // צבע שקוף מעט
                chartInstance.update();
            }
        }
        let glucoseData = []; // נתוני הסוכר שיתעדכנו
        let chartInstance; // שמירת הגרף באובייקט כדי לעדכן אותו

        // פונקציה להמרת תאריך לפורמט dd/mm/yyyy
        function formatDateToIsraeli(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // חודשים מתחילים מאפס ב-JS
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        // פונקציה לעדכון הגרף
        function updateChart(data) {
            const labels = data.map(item => formatDateToIsraeli(item.date || ''));
            const glucoseValues = data.map(item => item.glucose);

            if (chartInstance) {
                // עדכון נתונים בגרף קיים
                chartInstance.data.labels = labels;
                chartInstance.data.datasets[0].data = glucoseValues;
                chartInstance.update();
            } else {
                // יצירת גרף חדש
                const ctx = document.getElementById('glucoseChart').getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Sugar Level in blood',
                            data: glucoseValues,
                            borderColor: '#ff6396',
                            backgroundColor: '#ff639699',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false, // מאפשר שינוי גובה ללא שמירת יחס
                        scales: {
                            x: { 
                                title: { display: true, text: 'Date' },
                                type: 'category',
                            },
                            y: { title: { display: true, text: 'Sugar Level(mg/dL)' } }
                        }
                    }
                });
            }
        }

        // שליפת הנתונים מה-API
        $.get('/api/glucose/glucose-data')
        .done(function(response) {
            try {
                glucoseData = typeof response === 'string' ? JSON.parse(response) : response;

                // מיון הנתונים לפי התאריך
                glucoseData.sort((a, b) => new Date(a.date) - new Date(b.date));

                // הצגת הגרף עם כל הנתונים
                updateChart(glucoseData);

            } catch (error) {
                console.error('Failed to parse JSON data:', error);
            }
        })
        .fail(function(xhr, status, error) {
            console.error('Failed to load data:', status, error);
        });

        // סינון הנתונים לפי תאריכים
        $('#filterButton').click(function() {
            const startDate = $('#startDate').val();
            const endDate = $('#endDate').val();

            if (startDate && endDate) {
                const filteredData = glucoseData.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
                });

                if (filteredData.length > 0) {
                    updateChart(filteredData);
                } else {
                    alert('לא נמצאו נתונים בטווח התאריכים שנבחר.');
                }
            } else {
                alert('יש לבחור תאריך התחלה ויום סיום');
            }
        });

        // אתחול הגרף להצגת כל הנתונים
        $('#resetButton').click(function() {
            updateChart(glucoseData); // הצגת כל הנתונים מחדש
            $('#startDate').val('');
            $('#endDate').val('');
        });
    });