const express = require("express");
const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);
const app = express();
const router = require("./router/router.js");

app.use(express.json())

mongoose.connect("mongodb+srv://love2rizwan:CodingKe143Deewane@cluster0.xntbvdy.mongodb.net/RizwanDB", {
    useNewUrlParser: true
    
})
.then(()=> console.log("MongoDB is Connected"))
    .catch(error => console.log(error.message))


app.use("/", router);


app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port " + (process.env.PORT || 3000))
})