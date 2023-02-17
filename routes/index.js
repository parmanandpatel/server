import express from 'express'
const router = express.Router();


import customer from './customer';
import user from './user';
import userClass from './userclass';



router.use('/customer', customer);
router.use('/user', user);
router.use('/userclass', userClass);

module.exports = router


