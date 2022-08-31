const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware=require("../middleware/auth")

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",middleware.mid,middleware.mid1, userController.getUserData)

router.put("/users/:userId",middleware.mid,middleware.mid1, userController.updateUser)

router.delete("/delUser/:userId",middleware.mid,middleware.mid1,userController.deleteUser)




module.exports = router;