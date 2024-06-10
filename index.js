
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

let counter = users.length

app.use(bodyParser.json())
/* BEGIN - create routes here */

// GET /users 
app.get('/users', (req, res) => {
    console.log(users)
    res.json(users)
})

// :userId 
app.get('/users/:userId', (req, res) => { 
    const userId = req.params.userId
    const user = users.find(user => user._id === parseInt(userId))
    console.log(user)
    res.json(user)
})

app.put('/users/:userId', (req, res) => {
    const userId = req.params.userId
    const user = users.find(user => user._id === parseInt(userId))
    user.name = "New Name"
    console.log(user)
    res.json(user)
})

app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId
    const user = users.find(user => user._id === parseInt(userId))
    user.isActive = false
    res.send(userId + ' Deleted')
})


// POST /users
app.post('/users', (req, res) => {
    const newUser = req.body
    newUser._id = ++counter
    newUser.name = "New User",
    newUser.occupation = "",
    newUser.avatar = ""
    users.push(newUser)
    console.log(newUser)
    res.json(newUser)
})

/* END - create routes here */

app.listen(port, () => 
    console.log(`Example app listening on port ${port}!`))
