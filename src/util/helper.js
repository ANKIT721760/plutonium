function printDate() {
    const today = new Date()
    console.log("print current date", today.getDate())
}
function printMonth() {
    const month = new Date()
    console.log("print current month", month.getMonth() + 1)
}
function foo() {
    const b = new Date()
    console.log("print current year", b.getFullYear() )
}
function day() {
    const day1 = new Date()
    console.log("print current day", day1.getUTCDay() )
}


function getBatchInfo() {
    console.log("my batch name is plutonium, W3D5, the topic for today is Nodejs module ")
}
module.exports.printDate = printDate
module.exports.month = printMonth
module.exports.b = foo // i did extra here to print years and day
module.exports.day1 = day
module.exports.batchInfo = getBatchInfo