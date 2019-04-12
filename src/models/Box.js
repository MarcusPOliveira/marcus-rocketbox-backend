// models -> representações do schemas
const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: []
}, {
    timestamps: true //campos createdAt e updateAt
});

module.exports = mongoose.model('Box', Box);
