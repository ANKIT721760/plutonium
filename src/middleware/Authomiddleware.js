const jwt = require("jsonwebtoken");


 const mid=async function(req,res,next){
  
    

 
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    //in above 2 line we are verifying the case-sensitive cases;
  
    //If no token is present in the request header return error
    console.log(token);
    if (!token) {
      return res.send({ status: false, msg: "token must be present" });
      
    }
  
    let decodedToken = jwt.verify(token,"functionup-plutonium")
    if (!decodedToken) {
      return res.send({ status: false, msg: "token is invalid" });
      
    }

    next();
};


module.exports.mid=mid;