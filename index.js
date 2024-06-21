const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const workRoutes = require('./routes/workRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', workRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send("Welocome to pornHub");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
