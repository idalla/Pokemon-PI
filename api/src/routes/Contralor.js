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
    const pokemones = axios.get(API_POKEMON)
      .then(d => d.data)
      .then(data => { return data.results })
      .then(a => { return a.map(e => e.url) })
      .then(ab => {
        return Promise.all(ab.map(e => {
          return axios
            .get(e)
            .then(d => d.data)
            .then(data => { return data })
        }))
      })
      .then(ac => {
        return Promise.all(ac.map(e => {
          const official = 'official-artwork'
          if (e.types.length === 2) {
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
        }))
      })

    return pokemones
  } catch (error) {
    console.log('🚀 ~ file: functions.js ~ line 34 ~ getFromApi ~ error', error)
  }
}

const getFromDb = async () => {
  try {
    const poke = await Pokemon.findAll({
      include: {
        model: Type,
        through: {
          attributes: []
        },
        attributes: ['name', 'typeImg']
      }
    })
    /*     console.log('🚀 ~ file: Contralor.js ~ line 103 ~ getFromDb ~ poke', poke) */
    return poke
  } catch (error) {
    console.log('🚀 ~ file: Contralor.js ~ line 53 ~ getFromDb ~ error', error)
  }
}

const getPokemonById = async (id) => {
  try {
    if (id.length > 3) {
      const pokeDb = await Pokemon.findOne({
        where: {
          id
        },
        include: {
          model: Type,
          through: {
            attributes: []
          },
          attributes: ['name', 'typeImg']
        }
      })
      return !pokeDb ? "Sorry, we can't find the Pokemon you're looking for" : pokeDb
    } else {
      const idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(d => d.data)
        .then(e => {
          if (e.types.length === 2) {
            const pokemon = {
              id: e.id,
              name: e.name,
              life: e.stats.find(e => e.stat.name === 'hp').base_stat,
              attack: e.stats.find(e => e.stat.name === 'attack').base_stat,
              defense: e.stats.find(e => e.stat.name === 'defense').base_stat,
              speed: e.stats.find(e => e.stat.name === 'speed').base_stat,
              height: e.height,
              weight: e.weight,
              img: e.sprites.other['official-artwork'].front_default,
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
              img: e.sprites.other['official-artwork'].front_default,
              firstType: e.types.find(e => parseInt(e.slot) === 1).type.name
            }
            poke.firstImgType = TypeImage[poke.firstType]
            return poke
          }
        })
      return idApi || "Sorry, we can't find the Pokemon you're looking for"
    }
  } catch (error) {

  }
}

const getAllPokemons = async () => {
  try {
    const FromDb = await getFromDb()
    const FromApi = await getFromApi()
    return [...FromDb, ...FromApi]
  } catch (error) {
    console.log('🚀 ~ file: functions.js ~ line 58 ~ getAllPokemons ~ error', error)
  }
}

const getByName = async (name) => {
  try {
    const apiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(d => d.data)
      .then(e => {
        if (e.types.length === 2) {
          const pokemon = {
            id: e.id,
            name: e.name,
            life: e.stats.find(e => e.stat.name === 'hp').base_stat,
            attack: e.stats.find(e => e.stat.name === 'attack').base_stat,
            defense: e.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: e.stats.find(e => e.stat.name === 'speed').base_stat,
            height: e.height,
            weight: e.weight,
            img: e.sprites.other['official-artwork'].front_default,
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
            img: e.sprites.other['official-artwork'].front_default,
            firstType: e.types.find(e => parseInt(e.slot) === 1).type.name
          }
          poke.firstImgType = TypeImage[poke.firstType]
          return poke
        }
      })
    const dbName = await getFromDb()
    return typeof apiName === 'object' ? apiName : dbName.find(e => e.name)
  } catch (error) {
    return "Sorry, we can't find your pokemon's name"
  }
}

const getTypes = async () => {
  try {
    const traeInfo = await axios.get(API_TYPE)
      .then(d => d.data)
      .then(data => { return data.results })
      .then(res => {
        return res.map(e => e.name)
      })
      .then(re => {
        return Promise.all(re.map(async e => {
          if (e === 'shadow' || e === 'unknown') {
            await Type.create({ name: e })
          } else {
            const pokeType = await Type.create({ name: e, typeImg: TypeImage[e] })
            return pokeType
          }
        }))
      })

    return traeInfo
  } catch (error) {
    console.log('🚀 ~ file: Contralor.js ~ line 74 ~ getTypes ~ error', error)
  }
}

const postPokemon = async (name, life, attack, defense, speed, height, weight, types, img) => {
  try {
    if (!img || img === '') img = 'https://i.postimg.cc/ZRkj64zr/desconocido.png'
    if (name && life && attack && defense && speed && height && weight) {
      const pokes = await getByName(name)
      const novis = {
        name,
        life: parseInt(life),
        attack: parseInt(attack),
        defense: parseInt(defense),
        speed: parseInt(speed),
        height: parseInt(height),
        weight: parseInt(weight),
        img
      }

      if (typeof pokes === 'string') {
        if (types) {
          const newPokemon = await Pokemon.create(novis)
          types.map(async e => {
            const code = await Type.findOne({ where: { name: e } })
            return newPokemon.addType(code, {
              through: 'PokemonType'
            })
          })
          const newPoke = await Pokemon.findOne({ where: { name } })
          return newPoke
        } else {
          const newPoke = await Pokemon.create(novis)
          await newPoke.addType('normal', {
            through: 'PokemonType'
          })
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
  postPokemon,
  getByName,
  getPokemonById
}
