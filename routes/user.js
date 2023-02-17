import express from 'express'
const router = express.Router()
const UserController = require('../controllers/userconteroller');
const {validateEmailAndPassword,validEmail,checkPassword} = require("../middleware/validator")



router.post('/create',   validateEmailAndPassword, UserController.create)


module.exports = router;
//uploadVideo.single('video')