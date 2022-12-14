const jwt = require('jsonwebtoken');
const marksModel = require("../model/marksModel.js")
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


module.exports = { authentication }

