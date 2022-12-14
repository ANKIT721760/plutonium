const express = require("express")
const router = express.Router();
const userController = require("../controller/userController")
const marksController = require("../controller/marksController")
const mw = require("../middleware/auth.js")

//?============================ Create User ========================
router.post("/register",userController.createUser,)
router.post("/login", userController.loginUser,)

//?============================ Marks ========================
router.post("/marks",mw.authentication,mw.authorization , marksController.createMarks,)
router.get("/marksAll", mw.authentication,  marksController.getMarks,)
router.put("/updateMarks/:marksId", mw.authentication, mw.authorization, marksController.updateMarks,)
router.delete("/deleteMarks/:marksId", mw.authentication, mw.authorization, marksController.deleteMarks,)


//?============================ Check all URL ========================
router.all("/**", function (req, res) {
     res.status(400).send({status:false,message:"Invalid URL"})
 })

module.exports = router;
