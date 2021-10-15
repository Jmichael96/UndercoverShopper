const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const day = mongoose.model('Day', DaySchema);

module.exports = day;