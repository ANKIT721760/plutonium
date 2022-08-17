
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    "bookName" : {
        type : String,
        required : true,
        unique : true
    },
    "autherName" : String,
    "price" : {
        "indianPrice" : Number,
        "europePrice" : Number
    },
    "year" : {
        type : Number,
        default : 2021
    },
    "tags" : [String],
    "totalPages" : Number,
    "stockAvailable" : Boolean
}, { timestamps : true })

module.exports = mongoose.model('Book2', bookSchema)