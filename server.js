const express = require('express')
const app = express()
const { ROLE, users } = require('./data/user.data')
const { authUser, authRole } = require('./Authentication')
const projectPermission = require('./projectPermission')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectPermission)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/userDashboard', authUser,  (req, res) => {
  res.send('User Dashboard Page')
})

app.get('/adminDashboard', authUser , authRole(ROLE.ADMIN),  (req, res) => {
  res.send('Admin Dashboard Page')
})

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

app.listen(5000, () => {
    console.log("Server is up and running on port number : 5000");
});