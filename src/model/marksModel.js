const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true,
        unique: true
    },
    marks: {
        type: Number,
        required: true,

    },
    userId: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })


module.exports = mongoose.model('Mark', marksSchema);