const express = require('express');
const app = express(); // ודא שהמשתנה app מוגדר כאן

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
