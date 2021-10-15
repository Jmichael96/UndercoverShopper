const Cart = require('../models/Cart');
const { isEmpty } = require('jvh-is-empty');

//! @route    POST api/cart/create
//! @desc     Create an item in the cart
//! @access   Private
exports.create = async (req, res, next) => {
    if (isEmpty(req.body.dayId) || isEmpty(req.body.item)) {
        return res.status(406).json({
            serverMsg: 'Please fill the required fields',
            status: 406
        });
    }

    const newCart = new Cart({
        userId: req.user._id,
        dayId: req.body.dayId,
        item: req.body.item,
        text: req.body.text
    });

    await newCart.save().then((cart) => {
        res.status(201).json({
            status: 201,
            serverMsg: 'Your item has been created',
            cart
        });
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            serverMsg: 'There was a problem completing your request. Please try again later'
        });
    });
};

//! @route    GET api/cart/fetch_all/:dayId
//! @desc     Fetch all carts
//! @access   Private
exports.fetchAll = async (req, res, next) => {
    Cart.find({ dayId: req.params.dayId, userId: req.user._id })
        .then((items) => {
            if (isEmpty(items)) {
                return res.status(404).json({
                    serverMsg: 'You currently have no cart items. Start creating!',
                    status: 404
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched all items',
                items,
                status: 200
            })
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                serverMsg: 'There was a problem completing your request. Please try again later'
            });
        });
};

//! @route    PUT api/cart/mark_complete/:dayId/:cartId
//! @desc     Mark a cart item complete
//! @access   Private
exports.markComplete = async (req, res, next) => {
    Cart.findOne({ _id: req.params.cartId, dayId: req.params.dayId, userId: req.user._id })
        .then(async (item) => {
            if (isEmpty(item)) {
                return res.status(404).json({
                    status: 404,
                    serverMsg: 'Could not find the item you were looking for'
                });
            }
            item.isChecked = true;
            await item.save();

            return res.status(200).json({
                serverMsg: `${item.item} marked complete`,
                status: 200,
                item
            });
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                serverMsg: 'There was a problem completing your request. Please try again later'
            });
        });
};

//! @route    PUT api/cart/mark_uncomplete/:dayId/:cartId
//! @desc     Mark a cart item un-complete
//! @access   Private
exports.markUnComplete = async (req, res, next) => {
    Cart.findOne({ _id: req.params.cartId, dayId: req.params.dayId, userId: req.user._id })
        .then(async (item) => {
            if (isEmpty(item)) {
                return res.status(404).json({
                    status: 404,
                    serverMsg: 'Could not find the item you were looking for'
                });
            }
            item.isChecked = false;
            await item.save();

            return res.status(200).json({
                serverMsg: `${item.item} marked un-complete`,
                status: 200,
                item
            });
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                serverMsg: 'There was a problem completing your request. Please try again later'
            });
        });
};

//! @route    DELETE api/cart/delete/:dayId/:cartId
//! @desc     Delete a cart item
//! @access   Private
exports.delete = async (req, res, next) => {
    Cart.findOneAndDelete({ dayId: req.params.dayId, _id: req.params.cartId, userId: req.user._id })
        .then((item) => {
            if (isEmpty(item)) {
                return res.status(404).json({
                    status: 404,
                    serverMsg: 'Could not find the item you were looking for'
                });
            }
            return res.status(200).json({
                status: 200,
                serverMsg: 'Deleted item successfully',
                item
            });
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                serverMsg: 'There was a problem completing your request. Please try again later'
            });
        });
};