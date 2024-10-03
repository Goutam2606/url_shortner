const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3005;
const urlRouter = require("./routes/urlRoutes");

mongoose.connect('mongodb://127.0.0.1:27017/urlShortner');

const db = mongoose.connection;


db.on('error', () => {
    console.log("Error MongoDB is not Connected");
});

db.once('open', () => {
    console.log("MongoDB connected Successfully");

});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', urlRouter);
app.listen(port, () => {
    console.log(`Server is Running on localhost:${port}`);
});
