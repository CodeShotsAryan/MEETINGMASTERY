// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const interviewRoutes = require('./Routes/InterviewRoutes');

const app = express();

// Connect to MongoDB Atlas
// mongoose.connect('mongodb+srv://meetingmastery:meetingmastery.1edtnwv.mongodb.net/your_database_name?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Middleware to parse JSON request bodies
app.use(express.json());

// Use interviewRoutes
app.use('/api/interview', interviewRoutes);

// Other middleware and configurations...

module.exports = app;
const {Server} = require('socket.io')
const io = new Server(8000)

io.on('connection',(socket)=>{
    console.log(`Socket connect` , socket.id);
})
