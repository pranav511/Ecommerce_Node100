// const setToUserMap=new Map();
const jwt = require("jsonwebtoken");
const secret = "PrnavKewate";

function setForManger(manager) {
  return jwt.sign(
    {
      email: manager.email,
      id: manager.id,
      name: manager.name,
      managerId: manager._id,
    },
    secret,
    { expiresIn: "1h" }
  );
}

function getForManger(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setForManger,
  getForManger,
};
