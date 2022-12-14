const jwt = require('jsonwebtoken');
const marksModel = require("../model/marksModel.js")
const userModel =require("../model/userModel.js")
const mongoose = require('mongoose');

// ========================= Authentication =====================

const authentication = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, message: "token is required" });
        }

        const validToken = jwt.decode(token);
        if (validToken) {
            jwt.verify(token, "Student Data Management", (error) => {
                if (error) {
                    // console.log("Auth error", err); 
                    return res.status(400).send({ status: false, message: 'Token is Not Valid' });
                }

                next();
            });

        }

        req.decodedToken = validToken;

    } catch (error) {
        console.log('This is the error :', error.message);
        return res.status(500).send({ status: false, message: error.message });
    }

};

//--------------------------|| AUTHORIZATION ||--------------------------------


const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) {
            res.status(401).send({ status: false, msg: "missing a mandatory token" })
        };
     
        const decodedToken = jwt.verify(token, "Student Data Management");

        let userId = req.body.userId

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: 'Please enter valid userId Id in req.body' })
        }
        let userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(404).send({ status: false, message: "UserId not found " })
        }
        let user = userData._id.toString();

        if (decodedToken.userId != user) {
            return res.status(403).send({ status: false, msg: "You are not authorized" });
        }
        next();

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, Error: error.message });
    }
};

// DeStructuring
module.exports = { authentication, authorization }




