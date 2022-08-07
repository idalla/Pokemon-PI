const { Router } = require('express')
const { getFromDb, getFromApi, postPokemon } = require('../Contralor')
const { getAllPokemons } = require('../Contralor')
/* const { Pokemon, Type } = require('../../db') */

const Poke = Router()

Poke.get('/', async (req, res) => {
  try {
    const { name } = req.query
    if (name) {
      const poke = await getAllPokemons(name)
      typeof poke === 'string' ? res.status(404).send(poke) : res.status(200).json(poke)
    } else if (!name) {
      res.status(200).json(await getAllPokemons())
    }
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 19 ~ Poke.get ~ error', error)
    res.status(404).send("Sorry we're out of service")
  }
})

Poke.get('/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params
    if (idPokemon.length > 3) {
      const pokes = await getFromDb()
      console.log('🚀 ~ file: Poke.js ~ line 30 ~ Poke.get ~ pokes', pokes)
      const pokeDb = pokes.findByPk(parseInt(idPokemon))
      pokeDb ? res.status(200).json(pokeDb) : res.status(400).send("Sorry, we can't find the Pokemon you're looking for")
    } else {
      const pokesApi = await getFromApi()
      const pokeApi = pokesApi.find(e => parseInt(e.id) === parseInt(idPokemon))
      pokeApi ? res.status(200).json(pokeApi) : res.status(400).send("Sorry, we can't find the Pokemon you're looking for")
    }
  } catch (error) {
    console.log('🚀 ~ file: Poke.js ~ line 37 ~ Poke.get ~ error', error)
  }
})

Poke.post('/', async (req, res) => {
  const { name, life, attack, defense, speed, height, weight, type, img } = req.body
  try {
    const poke = await postPokemon(name, life, attack, defense, speed, height, weight, type, img)
    typeof poke === 'string' ? res.status(400).send(poke) : res.status(200).json(poke)
  } catch (error) {
    console.log('🚀 ~ file: Poke.js ~ line 89 ~ Poke.post ~ error', error)
    res.status(404).send("Sorry we can't uploud your Pokemon")
  }
})

module.exports = Poke
