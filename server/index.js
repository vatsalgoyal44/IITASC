const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const authJwt         = require('./Services/authJwt');


const User = require('./models/user.js');
const { request, response } = require('express');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/signup', User.signup)
app.post('/login', User.signin)
app.get('/studentinfo', async (request, response) => {
  authJwt.verifyToken(request, response, User.getinfo)
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })  

// app.get('/course', async function(req, res){
//   const courseID = req.query.courseid;
//   const info = await 
// })