// express
const express = require('express');
const app = express();
app.use(express.static('public'));

// session
const { sessionConfig } = require('./utils/session');
app.use(sessionConfig);

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// CSRF
const csrf = require('csurf');
app.use(csrf());
app.use((req, res, next) => { res.cookie('XSRF-TOKEN', req.csrfToken()); next(); });
app.use(function (err, req, res, next) {
    // 만일 토큰 에러가 아닌 다른 에러일경우 다른 에러처리 미들웨어로 보냅니다.
    if (err.code !== 'EBADCSRFTOKEN') { return next(err); }
    
    // CSRF 토큰 에러
    const errorHtml = /*html*/`<title>Failed</title><h2>CSRF token validation failed. Please refresh the page and try again.</h2>`;
    res.status(403).send(errorHtml);
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
