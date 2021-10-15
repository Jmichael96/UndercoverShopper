const User = require('../models/User');
const { isEmpty } = require('jvh-is-empty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//! @route    POST api/auth/register
//! @desc     Register user
//! @access   Public
exports.register = async (req, res, next) => {
    if (isEmpty(req.body.username) || isEmpty(req.body.password)) {
        return res.status(406).json({
            serverMsg: 'Please enter the required information'
        });
    }

    let foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
        return res.status(401).json({
            status: 401,
            serverMsg: 'The username you have chosen is currently in use'
        });
    }

    await bcrypt.hash(req.body.password, 10).then(async (hash) => {
        let newUser = new User({
            username: req.body.username,
            password: hash
        });

        await newUser.save().then(async (user) => {
            const payload = {
                user: {
                    _id: user._id,
                    username: user.username,
                }
            };

            await jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;

                return res.status(201).json({
                    status: 201,
                    serverMsg: `Welcome, ${user.username}`,
                    token
                });
            });
        }).catch((err) => {
            res.status(500).json({
                serverMsg: 'There was a problem creating your account. Please try again later.'
            });
        });
    }).catch((err) => {
        res.status(500).json({
            serverMsg: 'There was a problem completing your request. Please try again later'
        });
    });
};

//! @route    GET api/auth/load_user
//! @desc     Load user
//! @access   Private
exports.loadUser = async (req, res, next) => {
    if (!req.user._id) {
        return res.status(404).json({
            serverMsg: 'User not found'
        });
    }
    return res.status(200).json(req.user);
};

//! @route    POST api/auth/login
//! @desc     Login user
//! @access   Public
exports.login = async (req, res, next) => {
    if (isEmpty(req.body.username) || isEmpty(req.body.password)) {
        return res.status(403).json({
            serverMsg: 'Please enter the required information'
        });
    }

    let fetchedUser;

    User.findOne({ username: req.body.username })
        .then(async (user) => {
            if (!user) {
                return res.status(404).json({
                    serverMsg: 'Invalid username or password'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(async (result) => {
            if (!result) {
                return res.status(401).json({ 
                    status: 401,
                    serverMsg: 'Invalid username or password'
                });
            }
            const payload = {
                user: {
                    _id: fetchedUser._id,
                    username: fetchedUser.username,
                }
            };
            jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;

                return res.status(201).json({
                    serverMsg: `Howdy, ${fetchedUser.username}`,
                    token
                });
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'There was a problem with the server. Please try again later.'
            });
        });
};

//! @route    PUT api/auth/logout
//! @desc     Logout user
//! @access   Private
exports.logout = (req, res, next) => {
    User.findById({ _id: req.user._id })
        .then(async (user) => {
            // if a user doesn't exist
            if (!user) {
                return res.status(404).json({
                    serverMsg: 'No user found'
                });
            }
            // remove the auth header
            delete req.headers['x-auth-token'];
            return res.status(201).json({
                serverMsg: `Goodbye, ${user.username}`
            });
        }).catch((err) => {
            res.status(500).json({
                serverMsg: 'There was a problem completing this request. Please try again later'
            });
        });
};