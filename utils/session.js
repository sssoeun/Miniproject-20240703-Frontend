const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const redisClient = redis.createClient();

const sessionConfig = session({
    store: new RedisStore({ client: redisClient }),
    secret: 'qlalfdldi123698745',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } // HTTPS를 사용하는 경우 true로 설정
});

module.exports = { sessionConfig };