const router = require('express').Router();
const auth = require('./auth');
const day = require('./day');
const cart = require('./cart');

router.use('/api/auth', auth);
router.use('/api/day', day);
router.use('/api/cart', cart);

module.exports = router;