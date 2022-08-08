const express = require('express');
const abc = require('../introduction/intro')
const lodash= require('lodash');
const logger = require("../logger/logger.js")
const helper = require("../util/helper")
const validator = require("../validator/formetter.js")
const router = express.Router();
router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')

    logger.welcome();
    helper.printDate()
    helper.month()
    helper.b()
    helper.day1()
    helper.batchInfo()
    validator.trimString()
    validator.changetoLowerCase()
    validator.changeToUpperCase()
    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const chunked=lodash.chunk(months,3);
console.log(chunked);
    const unioned= lodash.union([2,43,32],[4,2,54,10],[32,43,56],[12,45],[99],[23,2,3,1,22,12,32])
      console.log(unioned)
      const paired= lodash.fromPairs([["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]])
console.log(paired)

});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason