const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
  res.send((new Date()).toISOString())
})

module.exports= router