const jwt = require("jsonwebtoken");

const mid=async function(req,res,next){
  try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    //in above 2 line we are verifying the case-sensitive cases;
  
    //If no token is present in the request header return error
    if (!token) {
      return res.status(404).send({ status: false, msg: "token must be present" });
    }
  let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken) {
      return res.status(404).send({ status: false, msg: "token is invalid" });
    }
  }catch(error){
    res.status(404).send({msg:error.message})
  }
next();
}

const mid1=async function (req,res,next){
  try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");

    //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId
  
  //userId comparision to check if the logged-in user is requesting for their own data
  if(userToBeModified != userLoggedIn) return res.status(401).send({status: false, msg: 'Unaturorized'})
  }catch(error){
    res.status(401).send({msg:error.message})
  }
  next();
}


module.exports.mid=mid;
module.exports.mid1=mid1;
