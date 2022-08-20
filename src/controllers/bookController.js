const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publisherModel")

//Q.3
const createBook= async function (req, res) {
    let bookData = req.body;
    let autherIDFinder =req.body.author;
   
    let publisherIDFinder =req.body.publisher;
    
    let findAuther=await authorModel.findOne({_id:autherIDFinder});
   
    let findPublish=await publisherModel.findOne({_id:publisherIDFinder});
    
    if(findAuther===null || findPublish===null){
        res.send("Invalid Input");
    }
    else if(findAuther===undefined || findPublish===undefined){
        res.send("Detail Is Required");
    }else{
        let bookCreated = await bookModel.create(bookData);
        res.send({data: bookCreated});
    }
    
}

//Q4.
const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate([("author"),("publisher")]);
    res.send({data: books})
}


module.exports.createBook= createBook;
module.exports.getBooksData= getBooksData;