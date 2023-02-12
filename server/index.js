const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var sessions = require('express-session');

const app = express()
const port = 4000
const authJwt         = require('./Services/authJwt');
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thiskeyissupposedtobesecretdonttellanyone",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

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
// app.get('/search', async (request, response) => {
//   authJwt.verifyToken(request, response, User.searchcourseinfo)
// });
app.get('/studinfo', async (request, response) => {
  authJwt.verifyToken(request, response, User.studgetinfo)
});
app.get('/instrstudinfo/:studid', async (request, response) => {
  authJwt.verifyToken(request, response, User.instrstudgetinfo)
});
app.get('/instinfo/:id', async (request, response) => {
  authJwt.verifyToken(request, response, User.instgetinfo)
});
app.get('/course/:course_id', async (request, response) => {
  authJwt.verifyToken(request, response, User.coursegetinfo)
});
app.post('/studinfo/dropcourse', async(request, response) => {
  authJwt.verifyToken(request, response,User.dropCourse)
})
app.post('/studinfo/regcourse', async(request, response) => {
  authJwt.verifyToken(request, response,User.regCourse)
})
app.get('/runningcourses', async(request, response) => {
  authJwt.verifyToken(request, response,User.runningCourses)
});
app.get('/dept/running', async (request, response) => {
  authJwt.verifyToken(request, response, User.deptgetinfo)
});
app.get('/dept/courses/:dept_name', async (request, response) => {
  authJwt.verifyToken(request, response, User.deptcoursegetinfo)
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