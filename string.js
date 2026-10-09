import client from './client.js'

async function init () {
    // client.rpush('number', 908)
    await client.hset('user:1001', {
    name: 'Sanju',
    email: 'sanju@example.com',
    age: '25',
    role: 'developer'
  });
  const result = await client.hgetall("user:1001")

  console.log('result==>', result)


}

init()