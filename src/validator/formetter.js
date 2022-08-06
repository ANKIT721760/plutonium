function trimString(){
    const stringSomething=" functionUp  "
    console.log("Before excute trim function ",stringSomething+". ")
    console.log("After excute trim function ",stringSomething.trim()+". ")
}
function changetoLowerCase(){
    const changetoLowerString="KAluRam"
    console.log("This is string before change to lowerCase",changetoLowerString)
    console.log("This is string after change to lowerCase",changetoLowerString.toLowerCase())
}
function changeToUpperCase(){
    const changetoUpperString="hEllo kaluRAm"
    console.log("This is string before change to lowerCase",changetoUpperString)
    console.log("This is the string after change to upperCase",changetoUpperString.toUpperCase())
}
module.exports.trimString=trimString
module.exports.changetoLowerCase=changetoLowerCase
module.exports.changeToUpperCase=changeToUpperCase