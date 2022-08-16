const { Router } = require('express')
const { postPokemon, getByName, getAllPokemons, getPokemonById } = require('../Contralor')
// const { Pokemon, Type } = require('../../db')

const Poke = Router()

Poke.get('/', async (req, res) => {
  try {
    const { name } = req.query
    if (name) {
      res.status(200).json(await getByName(name))
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
    const allId = await getPokemonById(idPokemon)
    typeof allId === 'string' ? res.status(400).send(allId) : res.status(200).json(allId)
  } catch (error) {
    console.log('🚀 ~ file: Poke.js ~ line 37 ~ Poke.get ~ error', error)
  }
})

Poke.post('/', async (req, res) => {
  const { name, life, attack, defense, speed, height, weight, types, img } = req.body
  console.log('🚀 ~ file: Poke.js ~ line 33 ~ Poke.post ~ types', types)
  try {
    const poke = await postPokemon(name, life, attack, defense, speed, height, weight, types, img)
    return (typeof poke === 'string') ? res.status(400).send(poke) : res.status(200).json(poke)
  } catch (error) {
    console.log('🚀 ~ file: Poke.js ~ line 89 ~ Poke.post ~ error', error)
    res.status(404).send("Sorry we can't uploud your Pokemon")
  }
})

module.exports = Poke
