const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const workRoutes = require('./routes/workRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;;;


// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const allowedOrigins = ['http://localhost:3000', "http://localhost:3001", 'http://localhost:5173', "https://steady-marzipan-081cef.netlify.app", "https://chipper-eclair-f73ce2.netlify.app"];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
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
