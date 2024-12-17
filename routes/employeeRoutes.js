const express=require('express');
const router=express.Router();
const {showEmployee,addEmployee,deleteEmployee,getEmployeeById, updateEmployee}=require('../controllers/employee')

router.get('/',showEmployee);
router.post('/',addEmployee);
router.delete('/:id',deleteEmployee);
router.get('/:id',getEmployeeById);
router.put('/:id',updateEmployee);

module.exports=router;