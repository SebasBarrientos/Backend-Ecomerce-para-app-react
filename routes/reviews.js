const express = require("express")
const { authentication, isAdmin } = require("../middleware/authentication")
const ReviewController = require("../controllers/ReviewController")
const router = express.Router()

router.post("/",authentication, ReviewController.create)
router.get("/",ReviewController.getAll)
router.put("/id/:id", authentication, ReviewController.updateById)
router.delete("/id/:id", authentication,isAdmin, ReviewController.delete)

module.exports = router