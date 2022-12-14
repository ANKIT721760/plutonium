const userModel = require('../model/userModel.js')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



//===============================Validation for User==============================
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

// ================================== Create User ===========================
const createUser = async function (req, res) {
   try {

       let data = req.body;
       
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter Data" })
        }
       let { name, email, password } = data;
       
        if (!name) {
            return res.status(400).send({ status: false, message: "Please enter your fistName" })
        }
        if (!/^[a-z ,.'-]+$/i.test(name)) {
            return res.status(400).send({ status: false, message: "fname should be in alphabate", });
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Please enter email" })
        };
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email entered is of Invalid Type" });
        }
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email.trim())) {
            return res.status(400).send({ status: false, message: "Email is invalid format" });
        };
        const duplicateEmail = await userModel.findOne({ email: email })

        if (duplicateEmail) {
            return res.status(400).send({ status: false, message: "Email Already  Exist" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "Please enter password" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is Empty" })
        }
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password.trim())) {
            return res.status(400).send({ status: false, message: " Please Enter minLen 8, maxLen 15 (please provide e.g-> Rizwan@1234)."})
        }

        const userData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully", data: userData })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}


// =========================================== login User ===========================================

const loginUser = async function (req, res) {
    try {

        let credential = req.body;

        if (Object.keys(credential).length == 0) {
            return res.status(400).send({ status: false, message: "Please Provide Crendential" })
        }
        let { email, password } = credential;
        if (!email) {
            return res.status(400).send({ status: false, message: "EmailId is mandatory" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is should be in string format" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "Password is mandatory" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is should be in string format" })
        }

         let userData = await userModel.findOne({ email: email, password: password });

        if (!userData) {
            return res.status(401).send({ status: false, massage: "Email and Password is not Correct" });
        };
        let token = jwt.sign(
            {
                userId: userData._id,
                iat: Math.floor(Date.now() / 1000)
            },
            "Student Data Management", {

            expiresIn: '10h' // expires in 10h
        });

        let data = {
            userId: userData._id,
            token: token

        }
        return res.status(201).send({ status: true, message: "User login successfully", data: data })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }

}


module.exports = { createUser, loginUser }