const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 5 * 60 * 1000
}));


// Define a route
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});