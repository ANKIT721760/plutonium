const express = require('express');
const abc = require('../introduction/intro')

const logger = require("../logger/logger.js")
const helper = require("../util/helper")
const validator = require("../validator/formetter.js")
const router = express.Router();
router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')

});
router.get('/test-me2', function (req, res) {
    res.send('My first ever api! Hello ankit,How are you dear?')
    logger.welcome();
    helper.printDate()
    helper.month()
    helper.batchInfo()
    validator.trimString()
    validator.changetoLowerCase()
    validator.changeToUpperCase()
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason