const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();


router.post('/', authentication, isAdmin, CategoryController.create)
router.get('/', CategoryController.getAll)
router.put('/id/:id', authentication, isAdmin, CategoryController.updateById)
router.delete('/id/:id', authentication, isAdmin, CategoryController.deleteById)
router.get('/id/:id', CategoryController.getById)
router.get('/name/:name', CategoryController.getByName)


module.exports = router;