const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.static('/build'))

const uri = 'mongodb+srv://johns:password12345@cluster0.cr9e0xj.mongodb.net/finalProject';

mongoose.connect(uri, { useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const attractionRouter = require('./Routes/Attractions');
const contactRouter = require('./Routes/contact');
app.use('/attractions', attractionRouter);
app.use('/contact', contactRouter);
app.use(express.static(path.join(__dirname, '../build')))

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('/build'))
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, '/build'))
//     })
//   }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});