const express = require('express')
const path = require('path')
var bodyparser = require('body-parser')
const PORT = process.env.PORT || 3002
const routes = require('./routes')

const app = express()
var mongoose = require('mongoose')
const db = require('./database/config/keys').mongoURI

mongoose.connect(db)

// Middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(routes)

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/build'))
  app.use(express.static('public/build'))
}

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`)
})
