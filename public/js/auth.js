// פונקציית התחברות
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // אם ההתחברות הצליחה, הפנה לדף אחר
            window.location.href = '/mainPage'; // החלף בנתיב של הדף הרצוי
        } else {
            const message = await response.text();
            document.getElementById('loginMessage').innerText = message;
        }
    } catch (error) {
        document.getElementById('loginMessage').innerText = 'Error logging in';
    }
});

// פונקציית רישום
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const message = await response.text();
        document.getElementById('registerMessage').innerText = message;
    } catch (error) {
        document.getElementById('registerMessage').innerText = 'Error registering user';
    }
});