const express = require('express');
const { earnTokens, spendTokens } = require('../controllers/tokenController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/earn', protect, earnTokens);
router.post('/spend', protect, spendTokens);

module.exports = router;
