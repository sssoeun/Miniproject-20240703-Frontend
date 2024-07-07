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

// node-cache 설정
const NodeCache = require('node-cache');
const transactionCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// transactionCache를 req 객체에 추가하는 미들웨어
app.use((req, res, next) => {
    req.transactionCache = transactionCache;
    next();
});

// Listen
https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`Frontend Server Ready. https://127.0.0.1`);
});

//// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/amm', require('./routes/asset-management'));
app.use('/real-estate', require('./routes/real-estate'));
