let router = require('express').Router();

// get post
router.get('/', async (req, res) => {
    const csrfToken = req.csrfToken();
    res.render('index.ejs', { user: req.session.user, csrfToken });
});

module.exports = router;