const marksModel = require("../model/marksModel.js")
const userModel = require('../model/userModel.js')
const mongoose =require('mongoose')



//  =================================== Validation Value Of Create cart ==================

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


//  =================================== Create cart ==================

const createMarks = async function (req, res) {

    try {
    
        let data = req.body
        let { name, subject, marks } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "please provide data in the body" })
        }
        if (!name)
            return res.status(400).send({ status: false, message: "name is required" })

        if (!isValid(name))
            return res.status(400).send({ status: false, message: "Incorrect name" })

        if (!subject)
            return res.status(400).send({ status: false, message: "subject is required" })

        if (!isValid(subject))
            return res.status(400).send({ status: false, message: "Incorrect subject" })

        if (marks) {
            if (!Number(marks))
                return res.status(400).send({ status: false, message: "Incorrect marks" })

        }
        if (!(marks))
            return res.status(400).send({ status: false, message: "marks is required" })


        const alreadyExist = await marksModel.findOne({ name, subject, isDeleted:false})
        
        if (alreadyExist == null) {
            const marks_data = await marksModel.create(data)
            return res.status(201).send({ status: true, message: "Success", data: marks_data })


        } else {

            let marks = data.marks + alreadyExist.marks
            const marks_data = await marksModel.findByIdAndUpdate(alreadyExist._id, {marks: marks}, {
                    new: true
                });
                return res.status(200).send({ status: true, message: "Success", data: marks_data })

            
        }


    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }
}





//  ================================= getMarks Data ==================

const getMarks = async function (req, res) {


    try {

        const { name, subject } = req.query
        let filter = { isDeleted: false }

        if (name) {
            filter.name = { $regex: name, $options: 'i' }
        }
        if (subject) {
            filter.subject = { $regex: subject, $options: 'i' }
        }
        const findData = await marksModel.find(filter)
        return res.status(200).send({status:false, message:"success", data:findData})


    }
    catch (error) {
            console.log(error.message)
            return res.status(500).send({ status: false, message: error.message })
        }
    


}



//================================ update MarksData ============================

const updateMarks = async function (req, res) {
    try {


        let data = req.body
        let markId = req.params.marksId
        let { name, subject, marks } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "please provide data in the body" })
        }
        if (name) {
            if (!isValid(name))
                return res.status(400).send({ status: false, message: "Incorrect name" })
        }

        if (subject) {
            if (!isValid(subject))
                return res.status(400).send({ status: false, message: "Incorrect subject" })

        }

        if (marks) {
            if (!Number(marks))
                return res.status(400).send({ status: false, message: "Incorrect marks" })

        }

        const update = {
            name: name,
            subject: subject,
            marks: marks
        }


        const updateData = await marksModel.findOneAndUpdate({ _id: markId }, update, {
            new: true
        });
        return res.status(200).send({ status: true, message: "Success", data: updateData })


    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }


}


//================================ Delete MarksData ============================
const deleteMarks = async function (req, res) {
    try {


        let markId = req.params.marksId

        const deleteData = await marksModel.findByIdAndUpdate({ _id: markId },
            { $set: { isDeleted: true } },
            { new: true });
        return res.status(200).send({ status: true, message: "Success", data: deleteData })

    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }


}

module.exports = { createMarks, getMarks ,updateMarks,deleteMarks }