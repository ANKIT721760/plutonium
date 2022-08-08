const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)

})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})
//Create an API for GET /movies that returns a list of movies.
// Define an array of movies in your code and return the value in response.
router.get('/movies', function (req, res) {

    const movieNames=['Batman Begins','The Dark Knight','The Dark Knight Rises','IronMan']
   
    res.send(movieNames)
});


//Create an API GET /movies/:indexNumber
// (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). 
//You can define an array of movies again in your api
//[‘Rang de basanti’, ‘The shining’, ‘Lord of the rings’, ‘Batman begins’] /movies/2

router.get('/movies/:indexNumber', function (req, res) {

    const movieNames=['Batman Begins','The Dark Knight','The Dark Knight Rises','IronMan']
    if (req.params.indexNumber< movieNames.length)
    {   
    res.send(movieNames[req.params.indexNumber])
    }
    else {
        res.send("Enter valid indexNumber")
    }
});

//Handle a scenario in problem 2 where if the index is greater than the valid maximum value
// a message is returned that tells the user to use a valid index in an error message.

router.get('/films', function (req, res) {

    const filmNames=[{id:1, name:"Don"},{id:2, name:"RaOne"},{id:3, name:"Swades"},{id:4, name:"Kal Ho Naa Ho"}]

   
    res.send(filmNames)
});


module.exports = router;