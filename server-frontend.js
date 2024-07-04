// express
const express = require('express');
const app = express();
app.use(express.static('public'));

// dotenv
const dotenv = require('dotenv').config();
const PORT = 3000;

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session
const { sessionConfig } = require('./utils/session');
app.use(sessionConfig);

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Listen
app.listen(PORT, function () {
    console.log(`Frontend Server Ready. http://127.0.0.1:${PORT}`);
});

//// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/amm', require('./routes/asset-management'));
app.use('/real-estate', require('./routes/real-estate'));
