// express
const express = require('express');
const app = express();
app.use(express.static('public'));

// HTTPS
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./rootca.key'),
    cert: fs.readFileSync('./rootca.crt')
};

// dotenv
const dotenv = require('dotenv').config();
const HTTPS_PORT = 443;

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
// app.listen(PORT, function () {
//     console.log(`Frontend Server Ready. http://127.0.0.1:${PORT}`);
// });
https.createServer(options, app).listen(HTTPS_PORT);

//// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/amm', require('./routes/asset-management'));
app.use('/real-estate', require('./routes/real-estate'));
