const { Router } = require('express')
const { getFromDb, getFromApi } = require('../Contralor')
const { getAllPokemons } = require('../Contralor')
const { Pokemon } = require('../../db')
const Poke = Router()

Poke.get('/', async (req, res) => {
  try {
    const { name } = req.query
    if (name) {
      const pokes = await getAllPokemons()
      const pokeName = name.toLowerCase()
      const poke = pokes.find(e => e.name === pokeName)
      poke ? res.status(200).json(poke) : res.status(404).send("Sorry we can't find your pokemon's name")
    } else if (!name) {
      res.status(200).json(await getAllPokemons())
    }
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 15 ~ Poke.get ~ error', error)
    res.status(404).send("Sorry we're out of service")
  }
})

Poke.get('/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params
    if (idPokemon > 3) {
      const pokes = await getFromDb()
      const pokeDb = await pokes.find(e => parseInt(e.id) === parseInt(idPokemon))
      pokeDb ? res.status(200).json(pokeDb) : res.status(400).send("Sorry, we can't find the Pokemon you're looking for")
    } else {
      const pokesApi = await getFromApi()
      const pokeApi = pokesApi.find(e => parseInt(e.id) === parseInt(idPokemon))
      pokeApi ? res.status(200).json(pokeApi) : res.status(400).send("Sorry, we can't find the Pokemon you're looking for")
    }
  } catch (error) {
    console.log('🚀 ~ file: Poke.js ~ line 51 ~ Poke.get ~ error', error)
  }
})

Poke.post('/', async (req, res) => {
  const { name, life, attack, defense, speed, height, weight } = req.body
  try {
    if (name && life && attack && defense && speed && height && weight) {
      const pokes = await getAllPokemons()
      const pokeName = name.toLowerCase()
      const poke = pokes.find(e => e.name === pokeName)
      if (poke) {
        res.status(404).send("The Pokemon that you're trying to introduce already exists")
      } else {
        const newPoke = await Pokemon.create({ name, life, attack, defense, speed, height, weight })

        res.status(200).json(newPoke)
      }
    } else {
      res.status(400).send('Sorry, we need  you to submit all items with: *')
    }
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 42 ~ Poke.post ~ error', error)
  }
})

module.exports = Poke
