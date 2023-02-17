const express = require("express");
const router = express.Router()
const UserClassController = require('../controllers/userclasscontroller');
const {validateEmailAndPassword,validEmail,checkPassword} = require("../middleware/validator")
const {tokenValidation} = require("../middleware/auth")
const {uploadfiles} = require("../middleware/uploadfile")


router.post('/create', UserClassController.createClass)
router.post('/search',UserClassController.search)
router.post('/bookslot/:id',UserClassController.bookClassSlot)


module.exports = router;
//uploadVideo.single('video')