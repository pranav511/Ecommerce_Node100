const {getForManger}=require('../services/auth')

async function getRestrictManger(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = getForManger(token);
    console.log("decode", decoded);
    req.manager = decoded;
    req.token = token;
    next();
  } catch (err) {
    res.status(400).send("Invalid token",err.message);
  }
}
  
  module.exports = {
    getRestrictManger,
  };

