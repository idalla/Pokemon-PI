const axios = require('axios')
const { API_POKEMON, API_TYPE } = require('../cttes')
const { Pokemon, Type } = require('../db')
const Promise = require('bluebird')

// por si es de la api

const getFromApi = async () => {
  try {
    const traeInfo = await axios.get(API_POKEMON)
      .then(d => d.data)
      .then(data => { return data.results })
    const filtraUrl = await traeInfo.map(e => e.url)
    const filtraXInfo = await Promise.all(filtraUrl.map(e => {
      return axios
        .get(e)
        .then(d => d.data)
        .then(data => { return data })
    }))
    const pokemones = await filtraXInfo.map(e => {
      const official = 'official-artwork'
      const pokemon = {
        id: e.id,
        name: e.name,
        life: e.stats.find(e => e.stat.name === 'hp').base_stat,
        attack: e.stats.find(e => e.stat.name === 'attack').base_stat,
        defense: e.stats.find(e => e.stat.name === 'defense').base_stat,
        speed: e.stats.find(e => e.stat.name === 'speed').base_stat,
        height: e.height,
        weight: e.weight,
        img: e.sprites.other[official].front_default,
        type: e.types[0].type.name
      }
      /* while (pokemons.length < 5); */
      /* console.log('🚀 ~ file: functions.js ~ line 35 ~ getFromApi ~ pokemon', pokemon) */

      /* console.log('🚀 ~ file: functions.js ~ line 41 ~ getFromApi ~ kemons', pokemons) */
      return pokemon
    })

    return pokemones
  } catch (error) {
    console.log('🚀 ~ file: functions.js ~ line 34 ~ getFromApi ~ error', error)
  }
}

const getFromDb = async () => {
  try {
    const poke = await Pokemon.findAll()
    return poke
  } catch (error) {
    console.log('🚀 ~ file: Contralor.js ~ line 53 ~ getFromDb ~ error', error)
  }
}

const getAllPokemons = async () => {
  try {
    const FromDb = await getFromDb()
    const FromApi = await getFromApi()
    return FromApi.concat(FromDb)
  } catch (error) {
    console.log('🚀 ~ file: functions.js ~ line 58 ~ getAllPokemons ~ error', error)
  }
}

const getTypes = async () => {
  try {
    const traeInfo = await axios.get(API_TYPE)
      .then(d => d.data)
      .then(data => { return data.results })

    /* console.log('🚀 ~ file: Contralor.js ~ line 69 ~ getTypes ~ traeInfo', traeInfo) */
    /* console.log('🚀 ~ file: Contralor.js ~ line 73 ~ getTypes ~ resul', results) */
    const filtraType = await traeInfo.map(e => e.name)
    /* console.log('🚀 ~ file: Contralor.js ~ line 75 ~ getTypes ~ filtraType', filtraType) */
    const trae = await Promise.all(filtraType.map(async e => {
      const pokeType = await Type.create({ name: e })
      return pokeType
    }))
    return trae
    /* console.log('🚀 ~ file: Contralor.js ~ line 75 ~ getTypes ~ pokeType', pokeType) */
  } catch (error) {
    console.log('🚀 ~ file: Contralor.js ~ line 74 ~ getTypes ~ error', error)
  }
}

module.exports = {
  getFromApi,
  getAllPokemons,
  getFromDb,
  getTypes
}
