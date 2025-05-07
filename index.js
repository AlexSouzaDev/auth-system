const express = require('express');
const helmet = require('helmet'); // Security middleware
const corss = require('cors'); // CORS middleware
const cookieParser = require('cookie-parser'); // Cookie parser middleware
const mongoose = require('mongoose'); // MongoDB ODM

const authRouter = require('./routers/authRouter'); // Importing auth router

const app = express();
app.use(corss());
app.use(helmet()); // Use helmet for security
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connected successfully!');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
})

app.use('/api/auth', authRouter); // Use auth router for authentication routes
// Import routes

app.get('/', (req, res) => {
    res.json({ message: 'Hello!' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})