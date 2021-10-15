const router = require('express').Router();
const DayController = require('../controllers/day');
const checkAuth = require('../middleware/checkAuth');

//! @route    POST api/day/create
//! @desc     Create a day
//! @access   Private
router.post('/create', checkAuth, DayController.createDay);

//! @route    DELETE api/day/delete/:id
//! @desc     Delete a day
//! @access   Private
router.delete('/delete/:id', checkAuth, DayController.deleteDay);

//! @route    GET api/day/all
//! @desc     Fetch all of the days
//! @access   Private
router.get('/all', checkAuth, DayController.fetchAll);

module.exports = router;