const BookModel = require("../models/bookModel2");
const AuthorModel = require("../models/authorModel");

//Q.1
const createBook = async function (req, res) {
  let data = req.body;
  let createData = await BookModel.create(data);
  res.send({ msg: createData });
};
const createAuthor = async function (req, res) {
  let data = req.body;
  let createData = await AuthorModel.create(data);
  res.send({ msg: createData });
};

//Q.2
const searchByID = async function (req, res) {
  let data = await AuthorModel.find({ author_name: "Chetan Bhagat" });
  let searchBook = await BookModel.find({author_id: data[0].author_id});
  res.send({ msg: searchBook });
};

//Q.3
const twoState = async function (req, res) {
  
  let allBook = await BookModel.find({name:"Two states"});
  let bookAuthor = await AuthorModel.find({author_Id:allBook[0].author_Id})
    let authorBook2 = bookAuthor[0].author_name 
    await BookModel.updateMany({name:"Two states"},{price:100}) 
    let uPrice = allBook[0].price
    res.send({ "author_name":authorBook2,"price":uPrice })
};

//Q.4
const priceBook=async function(req,res){
  let data=await BookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,price:1});
  // console.log(data);
  let author=await AuthorModel.find({author_id:data.map(x=>x.author_id)}).select({author_name:1,_id:0});
  let price=data[0].price
  res.send({author,price});
};



module.exports.createBook = createBook;
module.exports.createAuthor = createAuthor;
module.exports.searchByID = searchByID;
module.exports.twoState = twoState;
module.exports.priceBook = priceBook;
