const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/water-meter', {});

const Reading = mongoose.model('Readings', {
    value: {
        type: Number,
    },
    time: {
        type: Date
    }
});