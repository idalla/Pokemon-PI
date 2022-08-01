const { Router } = require('express')
const { getTypes } = require('../Contralor')
const { Type } = require('../../db')
const pokeTypes = Router()

pokeTypes.get('/', async (req, res) => {
  try {
    const trae = await getTypes()
    console.log('🚀 ~ file: PokeTypes.js ~ line 9 ~ pokeTypes.get ~ trae', trae)

    res.status(200).json(await Type.findAll())
  } catch (error) {
    res.status(404).json({ msg: error })
  }
})

module.exports = pokeTypes
