const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const CartController = require('../controllers/cart');

//! @route    POST api/cart/create
//! @desc     Create an item in the cart
//! @access   Private
router.post('/create', checkAuth, CartController.create);

//! @route    GET api/cart/fetch_all/:dayId
//! @desc     Fetch all carts
//! @access   Private
router.get('/fetch_all/:dayId', checkAuth, CartController.fetchAll);

//! @route    PUT api/cart/mark_complete/:dayId/:cartId
//! @desc     Mark a cart item complete
//! @access   Private
router.put('/mark_complete/:dayId/:cartId', checkAuth, CartController.markComplete);

//! @route    PUT api/cart/mark_uncomplete/:dayId/:cartId
//! @desc     Mark a cart item un-complete
//! @access   Private
router.put('/mark_uncomplete/:dayId/:cartId', checkAuth, CartController.markUnComplete);

//! @route    DELETE api/cart/delete/:dayId/:cartId
//! @desc     Delete a cart item
//! @access   Private
router.delete('/delete/:dayId/:cartId', checkAuth, CartController.delete);

module.exports = router;