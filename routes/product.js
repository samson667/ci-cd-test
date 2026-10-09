import express from 'express'
import axios from 'axios'
import client from '../client.js'

let route = express.Router()

route.get('/', async (req, res) => {
  console.log(req.ip)
  const cache = await client.get('todos')

  if (cache) {
    console.log('Serving from ---Cache ')
    return res.json(JSON.parse(cache))
  }

  const api = await axios.get('https://dummyjson.com/products')

  await client.set('todos', JSON.stringify(api.data), 'EX', 60)
  
  const cache_justnow = await client.get('todos')
  console.log('Serving from ----Db---Cache ')

  return res.json(JSON.parse(cache_justnow))
})

export default route
