const jwt = require("jsonwebtoken");
const config = require("../config.js");
// const db = require("../models");
// const User = db.user;

verifyToken = (req, res, next) => {
  
  session=req.session;
  console.log("HI",session)

  if(session.userid){
    req.id = session.userid
    next(req,res);
  }else
  res.status(403).send({
    message: "No session provided!"
  });  
};

const authJwt = {
    verifyToken: verifyToken,
  };
  module.exports = authJwt;
  