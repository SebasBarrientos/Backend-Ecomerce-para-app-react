const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();

router.post("/", UserController.create);
router.get("/", authentication, isAdmin,UserController.getAll);
router.get("/id", authentication,UserController.getById);
router.delete("/id/:id", authentication, isAdmin, UserController.delete);
router.put("/", authentication, UserController.update);
router.post("/login", UserController.login); 
router.delete("/logout", authentication, UserController.logout);

module.exports = router;