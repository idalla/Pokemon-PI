const axios = require('axios')
const { API_POKEMON, API_TYPE } = require('../cttes')
const { Pokemon, Type } = require('../db')
const Promise = require('bluebird')

// por si es de la api
const TypeImage = {
  bug: 'https://i.postimg.cc/bY4MJ6Dg/bug.png',
  dark: 'https://i.postimg.cc/9FTkqGyh/dark.png',
  dragon: 'https://i.postimg.cc/XYbzKpgy/dragon.png',
  electric: 'https://i.postimg.cc/6pf1MtHb/electric.png',
  fairy: 'https://i.postimg.cc/nLVS5ggF/fairy.png',
  fighting: 'https://i.postimg.cc/g0MtP4bv/fighting.png',
  fire: 'https://i.postimg.cc/fLJ2WXM1/fire.png',
  Flying: 'https://i.postimg.cc/QC7f139b/Flying.png',
  ghost: 'https://i.postimg.cc/05KWLpWw/ghost.png',
  grass: 'https://i.postimg.cc/FR8PYRRz/grass.png',
  ground: 'https://i.postimg.cc/c4q9Zr25/ground.png',
  ice: 'https://i.postimg.cc/vHWPmGd8/ice.png',
  normal: 'https://i.postimg.cc/52bsYDxB/normal.png',
  poison: 'https://i.postimg.cc/7Z9mgX6p/poison.png',
  psychic: 'https://i.postimg.cc/GppzzYT9/psychic.png',
  rock: 'https://i.postimg.cc/d0S6f1G6/rock.png',
  steel: 'https://i.postimg.cc/NM9Dvc4c/steel.png',
  water: 'https://i.postimg.cc/tTK5XMSV/water.png'
}

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
      if (e.types.length > 1) {
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
          firstType: e.types.find(e => parseInt(e.slot) === 1).type.name,
          secondType: e.types.find(e => parseInt(e.slot) === 2).type.name

        }
        pokemon.firstImgType = TypeImage[pokemon.firstType]
        pokemon.secondImgType = TypeImage[pokemon.secondType]
        return pokemon
      } else {
        const poke = {
          id: e.id,
          name: e.name,
          life: e.stats.find(e => e.stat.name === 'hp').base_stat,
          attack: e.stats.find(e => e.stat.name === 'attack').base_stat,
          defense: e.stats.find(e => e.stat.name === 'defense').base_stat,
          speed: e.stats.find(e => e.stat.name === 'speed').base_stat,
          height: e.height,
          weight: e.weight,
          img: e.sprites.other[official].front_default,
          firstType: e.types.find(e => parseInt(e.slot) === 1).type.name
        }
        poke.firstImgType = TypeImage[poke.firstType]
        return poke
      }
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

const getAllPokemons = async (name) => {
  try {
    const FromDb = await getFromDb()
    const FromApi = await getFromApi()
    if (name) {
      const pokeName = name.toLowerCase()
      const nameDb = FromDb.find(e => e.name.toLowerCase() === pokeName)
      const nameApi = FromApi.find(e => e.name.toLowerCase() === pokeName)
      if (nameDb) return nameDb
      else if (nameApi) { return nameApi } else return "Sorry, we can't find the Pokemon you're looking for"
    } else if (!name) {
      return FromApi.concat(FromDb)
    } else {
      return "Sorry we're out of service"
    }
  } catch (error) {
    console.log('🚀 ~ file: functions.js ~ line 58 ~ getAllPokemons ~ error', error)
  }
}

const getTypes = async () => {
  try {
    const traeInfo = await axios.get(API_TYPE)
      .then(d => d.data)
      .then(data => { return data.results })

    const filtraType = await traeInfo.map(e => e.name)

    const trae = await Promise.all(filtraType.map(async e => {
      if (e === 'shadow' || e === 'unknown') {
        await Type.create({ name: e })
      } else {
        const pokeType = await Type.create({ name: e, typeImg: TypeImage[e] })
        return pokeType
      }
    }))
    return trae
  } catch (error) {
    console.log('🚀 ~ file: Contralor.js ~ line 74 ~ getTypes ~ error', error)
  }
}

const postPokemon = async (name, life, attack, defense, speed, height, weight, type, img) => {
  try {
    if (name && life && attack && defense && speed && height && weight) {
      const pokes = await getAllPokemons(name)

      if (typeof pokes === 'string') {
        if (type) {
          const code = await Type.findOne({ where: { name: type } })
          const newPokemon = await Pokemon.create({ name, life, attack, defense, speed, height, weight, img })
          await newPokemon.setTypes(code)
          const newPoke = await Pokemon.findOne({ where: { name } })
          return newPoke
        } else {
          const newPoke = await Pokemon.create({ name, life, attack, defense, speed, height, weight, img })
          await newPoke.setTypes(1)
          return newPoke
        }
      } else {
        return ("The Pokemon that you're trying to introduce already exists")
      }
    } else {
      return ('Sorry, we need  you to submit all items with: *')
    }
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 65 ~ Poke.post ~ error', error)
  }
}

module.exports = {
  getFromApi,
  getAllPokemons,
  getFromDb,
  getTypes,
  postPokemon

}
