const router = require('express').Router
const axios = require('axios')

module.exports = router


router.get('/', async (req, res, next) => {
  try {
    // let queryStr = 'output=full&format=json'

    // const {data} = await axios.get(`http://api.petfinder.com/pet.getRandom?key=${process.env.PETFINDER_KEY}&${queryStr}&_ts=${Date.now()}`)

    res.json(data)

  } catch (error) {
    console.error(error)
  }
})
