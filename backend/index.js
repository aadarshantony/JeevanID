const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');

//Route & File Imports
const reportsRoute = require('./routes/reportsRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
}));
app.use(express.json());

//Routes
app.use('/api/reports', reportsRoute)
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening to localhost:${process.env.PORT}/api`);
})