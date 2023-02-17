import express from "express";
const router = express.Router()
import { validateEmailAndPassword, validEmail, checkPassword } from "../middleware/validator"
import { tokenValidation } from "../middleware/auth"
import { uploadfiles } from "../middleware/uploadfile"
import { register as _register,login as _login,allCustomers,allCustomer,getCustomer,logOut,updateProfile,updateProfileByToken,deleteCustomer,forGetPassword,updatePassword,uploadFile
} from "../controllers/customercontroller";


router.post('/register', validateEmailAndPassword, _register)
router.post('/login', validateEmailAndPassword, _login)
router.get('/list', allCustomers)
router.get('/pagination', allCustomer)
router.get('/getCustomerById/:id', getCustomer)
router.get('/logout', tokenValidation, logOut)
router.put('/updateProfile/:id', updateProfile)
router.put('/profileUpdate', tokenValidation, updateProfileByToken)
router.delete('/delete/cutomer/:id', deleteCustomer)
router.post('/forGetPassword', validEmail, forGetPassword)
router.post('/updatePassword', checkPassword, updatePassword)
router.post('/uploadFile', tokenValidation, uploadfiles.single('image'), uploadFile)

module.exports = router;
//uploadVideo.single('video')