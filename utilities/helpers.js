const EMP = require("../models/employee");
const ManagerRepo = require("../models/manager");

exports.generateEmployeeId = async () => {
  const defects = await EMP.find({});
  const Id ="E"+1001 + defects.length;
  return Id;
};

exports.generateManagerId = async () => {
  const defects = await ManagerRepo.find({});
  const Id ="M"+1001 + defects.length;
  return Id;
};
