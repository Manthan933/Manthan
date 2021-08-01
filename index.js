const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Init middleware
app.use(express.json({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect database
connectDB();

app.get('/api', (req, res) => {
  res.send('Welcome To mantha');
});

//// define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at ${port}`));
