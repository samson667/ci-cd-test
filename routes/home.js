import express from 'express'
import path from 'path'
import { public_folder } from '../index.js'

 let route = express.Router()

route.get('/', (req, res) => {
  res.sendFile(path.join(public_folder, 'index.html'))
})


export default route