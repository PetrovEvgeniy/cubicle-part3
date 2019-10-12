const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const secret = 'secret';
module.exports = (app) => {
    
    app.use(cookieParser(secret));
    app.set('views', path.resolve(__basedir, 'views'));
    app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: false}));
    app.use(bodyParser.urlencoded({extended: false}));
    
    app.use(express.static(path.resolve(__basedir,'static')));



};