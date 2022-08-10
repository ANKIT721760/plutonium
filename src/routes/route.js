const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    //logger.welcome()

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

    const movieNames=['Rang de basanti','The shining','Lord of the rings','Batman begins']
    if (req.params.indexNumber< movieNames.length)
    {   
    res.send(movieNames[req.params.indexNumber])
    }
    else {
        res.send("Enter valid indexNumber")
    }
});

// Write another api called GET /films. Instead of an array of strings define an array of movie objects this time.
 //Each movie object should have values - id, name. An example of movies array is 


router.get('/films', function (req, res) {

    const filmNames=[{id:1, name:"Don"},{id:2, name:"RaOne"},{id:3, name:"Swades"},{id:4, name:"Kal Ho Naa Ho"}]
    res.send(filmNames)

});
//Write api GET /films/:filmId where filmId is the value received in request path params.
// Use this value to return a movie object with this id. In case there is no such movie present in the array, 
//return a suitable message in the response body. Example for a request GET /films/3 should return the movie object 
// {
//     “id”: 3,
//     “name”: “Rang de Basanti”
//    }
//    Similarly for a request GET /films/9 the response can be something like - ‘No movie exists with this id’
   
router.get('/films/:filmId', function (req, res) {

    const id= req.params.filmId
    const filmNames=[{id:1, name:"Don"},{id:2, name:"RaOne"},{id:3, name:"Swades"},{id:4, name:"Kal Ho Naa Ho"}]
    let arr=[]
    filmNames.forEach(x => {
        if (id == x.id){
            arr=x;
        }        
     });
     if (arr.length !== 0){
         res.send(arr)
     } else {
         res.send('No movie exists with this id')
     }
});


   // -write an api which gives the missing number in an array of integers starting from 1….
router.get('/smissingnum', function (req, res) {

    let arr=[1,2,3,4,5,6,7,8,10]
    let sumNatural = (arr[arr.length-1]*(arr[arr.length-1]+1))/2;
    let sumArray=0;
    arr.forEach(x=> sumArray=sumArray+x);
    let missingNumber= sumNatural-sumArray;

    res.send("The missing number is:- "+missingNumber)

    
});
    // -write an api which gives the missing number in an array of integers starting from anywhere
router.get('/missin', function (req, res) {

    let arr=[33,34,36,37,38]
    let sumNatural = ((arr.length+1)*(arr[0]+arr[arr.length-1]))/2;
    let sumArray=0;
    arr.forEach(x=> sumArray=sumArray+x);
    let missingNumber= sumNatural-sumArray;

    res.send("The missing number is:- "+missingNumber)
    
})

module.exports = router;