require('dotenv').config({path:__dirname + '/.env'});
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
// const morgan = require('morgan');
const connectDB = require('./services/db');
const cors = require('cors');
const routes = require('./routes');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(cors())

// app.use(morgan('dev'));

app.use(routes);

app.use('/', (req, res) => {
    return res.send('Hello Mr. Dahmer!!');
});

app.listen(PORT, () => {
    console.log(`Bears... Beets... Battlestar Galactica on Port ${PORT}`);
});