function trimString(){
    const stringSomething=" functionUp  "
    console.log("Before excute trim function ",stringSomething+". ")
    console.log("After excute trim function ",stringSomething.trim()+". ") //here we have no space after using trim in functionUp
}
function changetoLowerCase(){
    const changetoLowerString="ANKIT RAJ KASHYAP"
    console.log(changetoLowerString)
    console.log(changetoLowerString.toLowerCase())// I change ANKIT RAJ KASHYAP TO ankit raj kashyap
}
function changeToUpperCase(){
    const changetoUpperString="ankit kashyap"
    console.log(changetoUpperString)
    console.log(changetoUpperString.toUpperCase())// I change ankit kashyap to ANKIT KASHYAP
}
module.exports.trimString=trimString //here i am calling out side the function for public
module.exports.changetoLowerCase=changetoLowerCase
module.exports.changeToUpperCase=changeToUpperCase