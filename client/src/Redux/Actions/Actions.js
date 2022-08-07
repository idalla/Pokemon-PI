import axios from 'axios'
import { GET_ALL, GET_BY_ID, ISLOADING, POST_POKEMON } from './type'

export const getAllPokemon = () => async (dispatch) => {
try {
  let res = await axios.get('http://localhost:3001/pokemons')
  return dispatch ({
    type: GET_ALL, payload: res.data
  })

  
} catch (error) {
console.log("🚀 ~ file: Actions.js ~ line 13 ~ getAllPokemon ~ error", error)
  
}


}
  


export const postPokemon = (name, life, attack, defense, speed, height, weight, type, img) => {
  return function (dispatch) {
    return axios.post('localhost:3001/pokemons', { name, life, attack, defense, speed, height, weight, type, img })
      .then(response => {
        dispatch({ type: POST_POKEMON, payload: response })
      })
  }
}

export const getPokemonById = (id) =>  async (dispatch) => {
    const d = await axios.get(`localhost:3001/pokemons/${id}`)
  const response = d.data
  dispatch({ type: GET_BY_ID, payload: response })
  }


export const filterPokemon = (filter) => {
  return {
    type: filter
  }
}

export const isLoading = () => { 

  return {
    type: ISLOADING
  }
}
