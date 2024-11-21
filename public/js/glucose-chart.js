$(document).ready(function() {
    $('#colorPicker').on('input', function() {
        const color = $(this).val(); 
        updateChartWithNewColor(color); 
    });

    function updateChartWithNewColor(color) {
        if (chartInstance) {
            chartInstance.data.datasets[0].borderColor = color;
            chartInstance.data.datasets[0].backgroundColor = color + '99'; 
            chartInstance.update();
        }
    }

    let glucoseData = []; 
    let chartInstance; 

    function formatDateToIsraeli(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function updateChart(data) {
        const labels = data.map(item => formatDateToIsraeli(item.date || ''));
        const glucoseValues = data.map(item => item.glucose);

        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = glucoseValues;
            chartInstance.update();
        } else {
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
                    maintainAspectRatio: false, 
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

    $.get('/api/glucose/glucose-data')
    .done(function(response) {
        try {
            glucoseData = typeof response === 'string' ? JSON.parse(response) : response;

            glucoseData.sort((a, b) => new Date(a.date) - new Date(b.date));

            updateChart(glucoseData);

        } catch (error) {
            console.error('Failed to parse JSON data:', error);
        }
    })
    .fail(function(xhr, status, error) {
        console.error('Failed to load data:', status, error);
    });

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

    $('#resetButton').click(function() {
        updateChart(glucoseData); 
        $('#startDate').val('');
        $('#endDate').val('');
    });
});
