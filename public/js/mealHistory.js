$(document).ready(function() {
    let mealData = [];

    function updateMealTable(data) {
        const tableBody = $('#mealData');
        tableBody.empty();
        data.forEach(meal => {
            const row = `
                <tr>
                    <td>${meal.description}</td>
                    <td>${meal.sugar}</td>
                    <td>${meal.glucose}</td>
                    <td>${meal.date || meal.entry_date}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    $.get('/api/history/meal-history')
        .done(function(response) {
            try {
                mealData = typeof response === 'string' ? JSON.parse(response) : response;
                updateMealTable(mealData);
            } catch (error) {
                console.error('Failed to parse JSON data:', error);
            }
        })
        .fail(function(xhr, status, error) {
            console.error('Failed to load data:', status, error);
        });

    $('#filterButton').click(function () {
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        if (startDate && endDate) {
            const filteredData = mealData.filter(item => {
                const itemDate = new Date(item.date || item.entry_date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return itemDate >= start && itemDate <= end;
            });
            if (filteredData.length > 0) {
                updateMealTable(filteredData);
            } else {
                alert('לא נמצאו נתונים בטווח התאריכים שנבחר.');
            }
        } else {
            alert('יש לבחור תאריך התחלה ויום סיום');
        }
    });

    $('#resetButton').click(function() {
        updateMealTable(mealData);
        $('#startDate').val('');
        $('#endDate').val('');
    });
});
