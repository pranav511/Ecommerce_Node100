const express=require('express');
const router=express.Router();
const {signup,login,logins}=require('../controllers/manager')

router.post('/',signup);
router.post('/login',login);


module.exports=router;