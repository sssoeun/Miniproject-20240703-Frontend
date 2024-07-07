let router = require('express').Router();
let { verifyToken } = require('../utils/jwt');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECTURI;
const state = 'RANDOM_STATE'; // CSRF 공격 방지를 위한 상태 토큰

const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;

// get post
router.get('/', verifyToken, async (req, res) => {
    try {
        if (!req.session.user) {
            res.clearCookie('uid', { path: '/' });
        }

        res.render('index.ejs', { 
            user: req.session.user, 
            api_url: api_url 
        });
    } catch (err) {
        res.status(500).send('DB Fail.');
    }
});

module.exports = router;