const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const authJwt         = require('./Services/authJwt');


const User = require('./Models/user.js');
const { request, response } = require('express');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/auth/signup', User.signup)
app.post('/auth/login', User.signin)
app.get('/reg/search', async (request, response) => {
  authJwt.verifyToken(request, response, User.searchcourseinfo)
});
app.get('/studinfo', async (request, response) => {
  authJwt.verifyToken(request, response, User.studgetinfo)
});
app.get('/instinfo/:id', async (request, response) => {
  authJwt.verifyToken(request, response, User.instgetinfo)
});
app.get('/courseinfo/:course_id', async (request, response) => {
  authJwt.verifyToken(request, response, User.coursegetinfo)
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