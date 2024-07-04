let router = require('express').Router();

// get post
router.get('/', async (req, res) => {
    try {
        if (!req.session.user) {
            res.clearCookie('uid', { path: '/' });
        }
        
        res.render('index.ejs', { user: req.session.user });
    } catch (err) {
        res.status(500).send('DB Fail.');
    }
});

module.exports = router;