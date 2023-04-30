import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import { generateFile } from './fileGenerator.js'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/randomdb', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to mongodb')
})

app.get('/generateFile', async (req, res) => {
  await generateFile()
  res.status(200).send("File Generated")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
