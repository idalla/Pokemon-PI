import { FILTER_AS, FILTER_AT, FILTER_AZ, FILTER_DES, FILTER_ZA, GET_ALL, GET_BY_ID, ISLOADING } from './Actions/type.js'

const initialState = {
  Pokemons: [],
  PokemonDetail: {},
  Loadiang: false
}
console.log("🚀 ~ file: Reducer.js ~ line 7 ~ initialState", initialState)

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        Pokemons: action.payload  
      }
    case GET_BY_ID:
      return {
        ...state,
        PokemonDetail: action.payload
      }
    case FILTER_AZ:
      return {
        ...state,
        Pokemons: state.Pokemons.sort((a, b) => a.name - b.name)
      }
    case FILTER_ZA:
      return {
        ...state,
        Pokemons: state.Pokemons.sort((a, b) => b.name - a.name)
      }
    case FILTER_AS:
      return {
        ...state,
        Pokemons: state.Pokemons.sort((a, b) => a.id - b.id)
      }
    case FILTER_DES:
      return {
        ...state,
        Pokemons: state.Pokemons.sort((a, b) => b.id - a.id)
      }
    case FILTER_AT:
      return {
        ...state,
        Pokemons: state.Pokemons.sort((a, b) => a.attack - b.attack)
      }
    case ISLOADING:
      return {
        ...state,
        Loadiang: !(state.Loadiang)
      }

    default:
      return {
        ...state
      }
  }
}
