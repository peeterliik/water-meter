const mongoose = require('mongoose');

const Reading = mongoose.model('Reading', {
    value: {
        type: Number,
    },
    time: {
        type: Date,
    },
    sent: {
        type: Boolean,
        default: false,
    },
});

module.exports = Reading;