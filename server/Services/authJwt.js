const jwt = require("jsonwebtoken");
const config = require("../config.js");
// const db = require("../models");
// const User = db.user;

verifyToken = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]; 
  }
  catch {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.id = decoded.username;
    
    next(req,res);
  });
};

const authJwt = {
    verifyToken: verifyToken,
  };
  module.exports = authJwt;
  