const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('DB Connected');
    } catch (error) {
        console.log('error: ',error)
        console.error('DB connection Fail');
        process.exit(1);
    }
    };

module.exports = connectDB;