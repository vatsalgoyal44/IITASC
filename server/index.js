const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const User = require('./models/user.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/login', User.signin)
app.get('/studentinfo', async function(req, res){
  const ID = req.query.ID;
  const info = await User.getinfo(ID);
  res.status(200).send(info)
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