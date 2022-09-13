const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;

//===============================//  createBlog  //==========================================================//
const createBlog = async function (req, res) {
  try {
    let { title, body, authorId, category } = req.body;
    if (!title) {
      return res.status(400).send({ msg: "title is a required field" });
    }
    if (!body) {
      return res.status(400).send({ msg: "body is a required field" });
    }
    if (!authorId) {
      return res.status(400).send({ msg: "authorId is a required field" });
    }
    if (!category) {
      return res.status(400).send({ msg: "category is a required field" });
    }
    let validObjectId = ObjectId.isValid(authorId);
    if (!validObjectId) {
      return res.status(400).send({ msg: "Please provide a valid authorid" });
    }
    let findAuthor = await authorModel.findOne({authorId ,isDeleted:false});
    if (!findAuthor) {
      return res.status(404).send({ msg: "AuthorId does not exist" });
    }
    let Blogdata = await blogsModel.create(req.body);
    res.status(201).send({ status: true, msg: Blogdata });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
//===============================//  getblogs   //======================================//

const getblogs = async function (req, res) {
  try {
    req.query.isDeleted = false;
    req.query.isPublished = true;
    let myData = await blogsModel.find(req.query);
    if (myData.length < 1) {
      return res.status(404).send({ status: false, msg: "No blog found" });
    }
    return res.status(200).send({ status: true, data: myData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

//======================================///  udate   //===========================================//

const updateblog = async function (req, res) {
  try {
    let { title, body, tags, subcategory, isPublished } = req.body;
    let myBody = {};
    if (title) {
      myBody.title = title;
    }
    if (body) {
      myBody.body = body;
    }
    if (tags) {
      myBody.tags = tags;
    }
    if (subcategory) {
      myBody.subcategory = subcategory;
    }
    if (isPublished) {
      myBody.isPublished = true;
      myBody.publishedAt = new Date()
    }
    let blogId = req.params.blogId;
    
    let myData = await blogsModel.findOneAndUpdate({ _id: blogId }, myBody, {
      new: true,
    });
    return res.status(200).send({
      status: true,
      data: myData,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};

//=====================================//  delete //===========================================//

const deleteblog = async function (req, res) {
  try {
   let myData = await blogsModel.findOneAndUpdate(
      { _id: req.params.blogId },
      { isDeleted: true, deletedAt:Date() },
      { new: true }
    );
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message,
    });
  }
};

const deleteByQueryParams = async function (req, res) {
  try {
    let obj = {};
    if (req.query.category) {
      obj.category = req.query.category;
    }
    if (req.query.authorId) {
      obj.authorId = req.query.authorId;
    }
    if (req.query.tag) {
      obj.tags = req.query.tags;
    }
    if (req.query.subcategory) {
      obj.subcategory = req.query.subcategory;
    }
    if (req.query.published) {
      obj.isPublished = req.query.isPublished;
    }
    let data = await blogsModel.findOne(obj);
    if (!data) {
      return res.status(404).send({ msg: "Blog does not exist" });
    }
    data.isDeleted = true;
    data.deletedAt = Date();
    data.save();
    return res.status(200).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.deleteblog = deleteblog;
module.exports.updateblog = updateblog;
module.exports.getblogs = getblogs;
module.exports.createBlog = createBlog;
module.exports.deleteByQueryParams = deleteByQueryParams