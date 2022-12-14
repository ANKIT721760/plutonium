const express = require("express")
const router = express.Router();
const userController = require("../controller/userController")
const marksController = require("../controller/marksController")
const mw = require("../middleware/auth.js")

//?============================ Create User ========================
router.post("/register",userController.createUser,)
router.post("/login", userController.loginUser,)

//?============================ Marks ========================
router.post("/marks",  marksController.createMarks,)
router.get("/marksAll", marksController.getMarks,)
router.put("/updateMarks/:marksId", marksController.updateMarks,)
router.delete("/deleteMarks/:marksId", marksController.deleteMarks,)


//?============================ Check all URL ========================
router.all("/**", function (req, res) {
     console.log("Invalid Url")
 })

module.exports = router;
