const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Q.1
const createUser = async function (req, res) {
  let data = req.body;
  try{
    let savedData = await userModel.create(data);
  res.status(200).send({ msg: savedData });
  }catch(error){
    res.status(400).send({msg:error.message})
  }
  
};

//Q.2
const loginUser = async function (req, res) {
  try{
    let userName = req.body.emailId;
    let password = req.body.password;
  
    let user = await userModel.findOne({ emailId: userName, password: password });
    
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "Radon",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
  }catch(error){
    res.status(403).send({msg:error.message});
  };
  };
  

//Q.3
const getUserData = async function (req, res) {
  try{

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    // if (!userDetails) {
    //   return res.send({ status: false, msg: "No such user exists" });
    // }
  
    res.status(202).send({ status: true, data: userDetails });
  }catch(error){
    res.status(403).send({msg:error.message});
  };
  };

//Q.4
const updateUser = async function (req, res) {
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  // if (!user) {
  //   return res.send("No such user exists");
  // }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(202).send({ status: updatedUser, data: updatedUser });
}catch(error){
  res.status(401).send({msg:error.message});
};
};
  

//Q.5
const deleteUser = async function (req, res) {
 
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  // if(!user){
  //   return res.send({msg:"No Such User! Try Again.."})
  // }
  
  let userDelete=await userModel.findOneAndUpdate({_id:userId},{"isDeleted":true});
  res.status(202).send({userDelete})

}catch(error){
  res.status(401).send({msg:error})
}
  
};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;