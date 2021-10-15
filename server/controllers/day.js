const Day = require('../models/Day');
const { isEmpty } = require('jvh-is-empty');
const Cart = require('../models/Cart');

//! @route    POST api/day/create
//! @desc     Create a day
//! @access   Private
exports.createDay = async (req, res, nest) => {
    const newDay = new Day({
        day: req.body.day,
        userId: req.user._id
    });

    await newDay.save().then(async (day) => {
        res.status(201).json({
            serverMsg: 'Created folder',
            status: 201,
            day
        });
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            serverMsg: 'There was a problem completing your request. Please try again later'
        })
    });
};

//! @route    DELETE api/day/delete/:id
//! @desc     Delete a day
//! @access   Private
exports.deleteDay = async (req, res, next) => {
    await Day.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
        .then(async (day) => {
            if (!day) {
                return res.status(404).json({
                    status: 404,
                    serverMsg: 'Could not find the day you wanted to remove'
                });
            }
            await Cart.deleteMany({ dayId: req.params.id, userId: req.user._id })
            .catch((err) => err);

            return res.status(200).json({
                status: 200,
                serverMsg: 'Deleted day folder successfully'
            });
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                serverMsg: 'There was a problem completing your request. Please try again later'
            });
        });
};

//! @route    GET api/day/all
//! @desc     Fetch all of the days
//! @access   Private
exports.fetchAll = async (req, res, next) => {
    await Day.find({ userId: req.user._id }).sort({ createdAt: -1 })
        .then((days) => {
            if (isEmpty(days)) {
                return res.status(404).json({
                    status: 404,
                });
            }
            res.status(200).json({
                serverMsg: 'Fetched days successfully',
                status: 200,
                days
            });
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                serverMsg: 'There was a problem completing your request. Please try again later'
            });
        });
};