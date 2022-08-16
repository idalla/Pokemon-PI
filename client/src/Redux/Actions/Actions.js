import axios from 'axios'
import { CLEAR_DETAIL, CLEAR_FILTER, FILT_NAME, GET_ALL, GET_DETAIL, GET_TYPE, ISLOADING, POST_POKEMON } from './type'

export const getAllPokemon = () => async (dispatch) => {
  try {
   await fetch('http://localhost:3001/pokemons').then(data => data.json()).then(data =>{
      return dispatch ({
    type: GET_ALL, payload: data
    })
    })
   
  } 
  catch (error) {
    console.log("🚀 ~ file: Actions.js ~ line 13 ~ getAllPokemon ~ error", error)
  
  }


}
  


export const postPokemon = (name, life, attack, defense, speed, height, weight, types, img) => {
  return function (dispatch) {
    return axios.post('http://localhost:3001/pokemons', { name, life, attack, defense, speed, height, weight, types, img})
      .then(response => {
        dispatch({ type: POST_POKEMON, payload: response })
      })
  }
}

/* export const getPokemonById = (id) =>  async (dispatch) => {
  try {
    await fetch(`http://localhost:3001/pokemons/${id}`)
    .then(data => data.json())
    .then(res => { 
      return dispatch({ type: GET_BY_ID, payload: res })
    })
    
  } 
  catch (error) {
   window.location.href = "http://localhost:3000/home";
   console.log(error)
    
  }
} */
export const getDetail = (id) =>  async (dispatch) => {
  try {
     await fetch(`http://localhost:3001/pokemons/${id}`)
     .then(data => data.json())
     .then(data => {
      return dispatch({ type: GET_DETAIL, payload: data })
    }
    )
     
  } 
  catch (error) {
   window.location.href = "http://localhost:3000/home";
   console.log(error)
    
  }
}


export const filterPokemonName = (name) => async (dispatch) =>  {
try {
  await fetch(`http://localhost:3001/pokemons?name=${name}`)
  .then(data => data.json())
  .then(response => {
    return dispatch({
      type: FILT_NAME, payload: response
    })
  })
} catch (error) {
  
}
}
export const filterPokemon = (filter) => {
  return {
    type: filter
  }
}

export const isLoading = (boolean) => { 

  return {
    type: ISLOADING,
    payload: boolean
  }
}

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload: {}
  }
}
export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  }
}

export const getType = () => async (dispatch) => {
try {
   await fetch('http://localhost:3001/types')
   .then(data => data.json())
   .then(response => {
    return dispatch({type:GET_TYPE, payload: response})
   })

} catch (error) {
console.log("🚀 ~ file: Actions.js ~ line 105 ~ getType ~ error", error)
  
}

}