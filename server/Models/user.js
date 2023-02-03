const environment     = process.env.NODE_ENV || 'development';    // set environment
// const configuration   = require('../../knexfile')[environment];   // pull in correct db with env configs
const bcrypt          = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
const crypto          = require('crypto')
const queries         = require('../queries')  
const jwt             = require("jsonwebtoken");
const { get } = require('http');


const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
        err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}

const signin = async function(req, res){
    // get user creds from request body
    // find user based on username in request
    // check user's password_digest against pw from request
    // if match, create and save a new token for user
    // send back json to client with token and user info
    const username = req.body.username;
    const password = req.body.password;

    queries.finduser(username).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ username: user.username }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            username: user.username,
            email: user.email,
            accessToken: token
        });
        
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const getinfo = async function(ID){
    // const ID = req.body.ID;
    const queryresponse = await queries.studentinfo(ID);
    // queryresponse = JSON.parse(queryresponse);
    // console.log(queryresponse)
    console.log(queryresponse)
    return queryresponse
    // res.status(200).send({
    //     info: queryresponse
    // });
}

module.exports.getinfo = getinfo;
module.exports.signin = signin;