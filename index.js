const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const workRoutes = require('./routes/workRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this to your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', workRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
