const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
const authJwt         = require('./Services/authJwt');
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));



const User = require('./Models/user.js');
const { request, response } = require('express');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/auth/signup', User.signup)
app.post('/auth/login', User.signin)
app.get('/studentinfo', async (request, response) => {
  authJwt.verifyToken(request, response, User.getinfo)
});

// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' })
//   })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })  

// app.get('/course', async function(req, res){
//   const courseID = req.query.courseid;
//   const info = await 
// })