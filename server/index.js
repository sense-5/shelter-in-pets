const express = require('express')
const volleyball = require('volleyball')
const app = express()
const db = require('./db')
const PORT = process.env.PORT || 3000;

module.exports = app


app.use(volleyball)
app.use('/api', require('./api'))

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const syncDb = () => db.sync()

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, err => {
    if (err) {
      console.error(err)
    } else console.log('app listening on port')
  })
}


async function bootApp() {
  await syncDb()
  await startListening()
}

bootApp()
