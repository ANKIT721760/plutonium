const BookModel = require('../models/bookModel.js')

const getBook = async function(req,res){
    let data = await BookModel.find().select({"bookName":1, "autherName":1, _id:0})
    res.send({ msg : data })
}

const bookYear = async function(req,res){
    let year = req.body.year
    let data = await BookModel.find({"year" : year})
    res.send({ msg : data })
}

const bookPrice = async function(req,res){
    let data = await BookModel.find({"price.indianPrice" : {$in : [100,200,500]}})
    res.send({ msg : data })
}

const randomBook = async function(req,res){
    let data = await BookModel.find({
        $or : [{totalPages : {$gt : 500}}, {stockAvailable : true}]
    })
    res.send({ msg : data })
}

const createBook = async function(req,res){
    let data = req.body
    let createdBook = await BookModel.create(data)
    res.send({ msg : createdBook })
}

const particularBook = async function(req,res){
    let data = req.body
    // let condition = Object.keys(data)[0]
    // let value = Object.values(data)[0]
    // console.log(condition,value);
    // let book = await BookModel.find({[condition] : value})
    let book = await BookModel.find(data)
    res.send({ msg : book })
}

module.exports.createBook = createBook
module.exports.getBook = getBook
module.exports.bookYear = bookYear
module.exports.bookPrice = bookPrice
module.exports.randomBook = randomBook
module.exports.particularBook = particularBook