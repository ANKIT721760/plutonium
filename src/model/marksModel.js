const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
   
    },
    subject: {
        type: String,
        required: true,
        //unique: true
    },
    marks: {
        type: Number,
        required: true,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })


module.exports = mongoose.model('Mark', marksSchema);