const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    item: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    dayId: {
        type: String,
        ref: 'Day',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const cart = mongoose.model('Cart', CartSchema);

module.exports = cart;