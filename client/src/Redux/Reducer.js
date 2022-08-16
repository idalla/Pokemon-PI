import { CLEAR_DETAIL, CLEAR_FILTER, FILTER_AS, FILTER_AT, FILTER_AZ, FILTER_DES, FILTER_ZA, FILT_NAME, GET_ALL, GET_BY_ID, GET_DETAIL, GET_TYPE} from './Actions/type.js'



const initialState = {
  Pokemons: [],
  PokemonFilter: [],
  PokemonDetail: {},
  Types: [],
}


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        Pokemons: action.payload,
        PokemonFilter: action.payload  
      }
    case GET_BY_ID:
      return {
        ...state,
        Pokemons: state.Pokemons.filter(e => e.id === action.payload.id)
      }
    case GET_DETAIL:
      return {
        ...state,
        PokemonDetail: action.payload
        }
    case FILTER_AZ:
      return {
        ...state,
        PokemonFilter: state.PokemonFilter.sort((a, b) => a.name - b.name)
      }
    case FILTER_ZA:
      return {
        ...state,
        PokemonFilter: state.PokemonFilter.sort((a, b) => b.name - a.name)
      }
    case FILTER_AS:
      return {
        ...state,
        PokemonFilter: state.PokemonFilter.sort((a, b) => a.id - b.id)
      }
    case FILTER_DES:
      return {
        ...state,
        PokemonFilter: state.PokemonFilter.sort((a, b) => b.id - a.id)
      }
    case FILTER_AT:
      return {
        ...state,
        PokemonFilter: state.PokemonFilter.sort((a, b) => a.attack - b.attack)
      }
      case CLEAR_DETAIL:
      return {
        ...state,
        PokemonDetail: action.payload
      }
      case CLEAR_FILTER:
      return {
        ...state,
        PokemonFilter: state.Pokemons 
      }
      case FILT_NAME:
        /* const PokeSearch = state.Pokemons.filter(e => {
          return e.name.includes(action.payload)
        }) */
        const PokeSearch = action.payload
        
         return typeof PokeSearch === 'object'  ? {
          ...state,
          PokemonFilter: [PokeSearch] 
        } : {
          ...state, 
          PokemonFilter: []} 

      case GET_TYPE: 
      return{
        ...state,
        Types: action.payload
      }

    default:
      return {
        ...state
      }
  }
}
