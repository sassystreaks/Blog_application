require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db')

const app = express();
const PORT = 5000 || process.env.PORT;

//connect to DB
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

//Templating engine
app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
});