const EMP = require("../models/employee");
const validator = require("../utilities/validator");
const helper = require("../utilities/helpers");

// get to show employee list
async function showEmployee(req, res) {
  try {
    const employee = await EMP.find(
      { managerId: req.manager.managerId },
      { _id: 0, __v: 0 }
    );
    console.log("employee", employee);
    if (employee) {
      res.status(200).send(employee);
    } else {
      res.json({ employee: "NOT Found" });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }


}

//to add details of employee by post http verb
async function addEmployee(req, res) {
  try {
    if (
      validator.ValidateName(req.body.name)
      //  &&validator.ValidateAge(req.body.age)
    ) {
      const Id = await helper.generateEmployeeId();
      const employee = await EMP.create({
        id: Id,
        name: req.body.name,
        age: req.body.age,
        managerId: req.manager.managerId,
      });
      res.status(201).json({
        status: "success",
        data: {
          employee,
        },
      });
    } else if (!validator.ValidateName(req.body.name)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid Name",
      });
    } else if (!validator.ValidateAge(req.body.age)) {
      res.status(400).json({
        status: "error",
        results: "Age should be in range of 18 and 58",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

// delete the employee as per their id's by delete  http verb
async function deleteEmployee(req, res, err) {
  try {
    const delEmp = await EMP.deleteOne({ id: req.params.id });
  if (delEmp.deletedCount === 0) {
    res.status(404).json({
      status: "fail",
      message: "No defect available for this ID",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: `Defect with ${req.params.id} ID deleted`,
    });
  }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

// get the employee as per their id's by get  http verb
async function getEmployeeById(req, res) {
  try {
    const result = await EMP.findOne({ id: req.params.id }, { _id: 0, __v: 0 });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send("Internal Error", err.message);
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function updateEmployee(req, res) {
  try {
    const products = await EMP.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true, //to return new doc back
        runValidators: true, //to run the validators which specified in the model
      }
    );
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: `No defects available with ID ${req.params.id} `,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fails",
      message: err.message,
    });
  }
}

module.exports = {
  showEmployee,
  addEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
};
