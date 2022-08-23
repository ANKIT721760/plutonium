const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publisherModel")


//Q.3
const createBook = async function (req, res) {
  let book = req.body;
  let authorData = await authorModel.find().select({ _id: 1 });
  let publisherData = await publisherModel.find().select({ _id: 1 });
  let authorID = authorData.map(function (x) {
    return x._id.toString();
  });
  let publisherID = publisherData.map(function (x) {
    return x._id.toString();
  });
  if (!(book.author && book.publisher)) {
    res.send({ msg: "Entry is missing" });
  } else if (
    !(authorID.includes(book.author) && publisherID.includes(book.publisher))
  ) {
    res.send({ msg: "ID is not valid" });
  } else {
    let bookData = await bookModel.create(book);
    res.send({ data: bookData });
  }
};
//Q4.
const getBooksData= async function (req, res) {
    let allBooks = await bookModel
    .find()
    .populate("author")
    .populate("publisher");
    res.send({data: allBooks })
}


module.exports.createBook= createBook;
module.exports.getBooksData= getBooksData;