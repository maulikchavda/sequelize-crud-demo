require('dotenv').config()
const express = require('express')
// const bodyParser = require('body-parser')
// const serverless = require('serverless-http')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  next()
})

const indexRoute = require('./src/routes')
const response = require('./src/services/response')
const { FAIL } = require('./src/services/constant')

app.use('/',(req,res) => {
  res.json({message:"HELLO THERE"})
})
app.use('/api', indexRoute)
app.use((err, req, res, next) => {
  if (err) {
    return response.successResponseWithoutData(res, err.message, FAIL)
  }
})

// const handler = serverless(app)
// module.exports.app = async (event, context) => {
//   try {
//     return await handler(event, context)
//   } catch (error) {
//     return error
//   }
// }

//
app.listen(PORT,() => {
  console.log(`Sever started on port ${PORT}`)
})
