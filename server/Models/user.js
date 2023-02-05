const environment     = process.env.NODE_ENV || 'development';    // set environment
// const configuration   = require('../../knexfile')[environment];   // pull in correct db with env configs
const bcrypt          = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
const crypto          = require('crypto')
const queries         = require('../queries')  
const jwt             = require("jsonwebtoken");
const config          = require('../config');
const { get } = require('http');
const authJwt         = require('../Services/authJwt');


const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
}

const signup = async function(req, res){
    const user = req.query
    console.log(req)
    hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password
      user.password = hashedPassword
    })
    .then(() => {
        const token = jwt.sign({ username: user.username }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
        queries.createuser(user, token).then(user => {
            //   delete user.password
              res.status(201).send(user)
            }).catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}

const signin = async function(req, res){
    // get user creds from request body
    // find user based on username in request
    // check user's password_digest against pw from request
    // if match, create and save a new token for user
    // send back json to client with token and user info
    const username = req.query.username;
    const password = req.query.password;

    queries.finduser(username).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        bcrypt.compare(
            password,
            user.hashed_password
        ).then((passwordIsValid) => {
            if (!passwordIsValid) {
                return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
            }
            
            let payload = { "username" : username};
            var token = jwt.sign(payload, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                accessToken: token
            });
            
        })
        })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const studgetinfo = async function(req, res){
    const ID = req.id;
    const queryresponse = await queries.studentinfo(ID);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
        // res.status(200).send({
    //     info: queryresponse
    // });
}

const instgetinfo = async function(req, res){
    const { id } = req.params
    console.log(req)
    const queryresponse = await queries.instinfo(id);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const coursegetinfo = async function(req, res){
    const { course_id } = req.params
    console.log(req)
    const queryresponse = await queries.courseinfo(course_id);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

const searchcourseinfo = async function(req, res){
    const keystring = req.query.keystring;
    console.log(req)
    console.log(keystring)
    const queryresponse = await queries.searchcourse(keystring);
    console.log(queryresponse)
    res.status(200).send(queryresponse)
}

module.exports.studgetinfo = studgetinfo;
module.exports.instgetinfo = instgetinfo;
module.exports.coursegetinfo = coursegetinfo;
module.exports.searchcourseinfo = searchcourseinfo;
module.exports.signin = signin;
module.exports.signup = signup;