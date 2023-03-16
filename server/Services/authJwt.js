verifyToken = (req, res, next) => {
  
  session=req.session;
  if(session.userid){
    req.id = session.userid
    next(req,res);
  }else{
    console.log("HIHIHIHIHHIHI")
    res.status(403).send({
    message: "No session provided!"
  });  
}
};

const authJwt = {
    verifyToken: verifyToken,
  };
  module.exports = authJwt;
  