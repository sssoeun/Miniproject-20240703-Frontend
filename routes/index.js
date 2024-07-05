let router = require('express').Router();
let { verifyToken } = require('../utils/jwt');

// get post
router.get('/', verifyToken, async (req, res) => {
    try {
        if (!req.session.user) {
            res.clearCookie('uid', { path: '/' });
        }

        const csrfToken = req.csrfToken();
        res.render('index.ejs', { user: req.session.user, csrfToken });
    } catch (err) {
        res.status(500).send('DB Fail.');
    }
});

module.exports = router;