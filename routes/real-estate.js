let router = require('express').Router();

// real-estate
// 부동산 매물 목록
router.get('/', async function (req, res) {
    res.render('real-estate/list.ejs');
});

// 부동산 매물 등록 폼
router.get('/enter', async function (req, res) {
    res.send('/real-estate/enter get 입니다.');
});

// 부동산 매물 등록 Submit
router.post('/save', async function (req, res) {
    res.send('/real-estate/save post 입니다.');
});

// 부동산 매물 게시물의 내용
router.get('/content/:post_id', async function (req, res) {
    res.send(`req.params.post_id: ${req.params.post_id}`);
});

// 부동산 매물 수정 폼
router.get('/edit/:post_id', async function (req, res) {
    res.send(`req.params.post_id: ${req.params.post_id}`);
});

// 부동산 매물 수정 Submit
router.post('/edit', async function (req, res) {
    res.send('/real-estate/edit 입니다.');
});

// 부동산 매물 삭제 Submit
router.post('/delete', async function (req, res) {
    res.send('/real-estate/delete 입니다.');
});

// 부동산 매물 매매가 구매 Submit
router.post('/selling', async function (req, res) {
    res.send('/real-estate/selling 입니다.');
});

// 부동산 매물 전세가 구매 Submit
router.post('/jeonse', async function (req, res) {
    res.send('/real-estate/jeonse 입니다.');
});

module.exports = router;