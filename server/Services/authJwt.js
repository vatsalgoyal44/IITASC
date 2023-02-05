const jwt = require("jsonwebtoken");
const config = require("../config.js");
// const db = require("../models");
// const User = db.user;

verifyToken = (req, res, next) => {
  try{
    console.log(req.method)
    let token;
    if(req.method=='POST'){
      token = req.body.headers.Authorization.split(' ')[1];
    } 
    else{
      token = req.headers.authorization.split(' ')[1];
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
  }
  catch {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  
};

const authJwt = {
    verifyToken: verifyToken,
  };
  module.exports = authJwt;
  