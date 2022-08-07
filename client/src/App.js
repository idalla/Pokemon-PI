import './App.css'
import { Route } from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage.jsx'
import Pokemons from './Components/Pokemons/Pokemons.jsx'
/* import PokemonDetail from './Components/PokemonDetail/PokemonDetail.jsx'
import CreatePokemon from './Components/CreatePokemon/CreatePokemon.jsx' */
function App () {
  return (
    <div className='App'>
      <Route  exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Pokemons} />
{/*       <Route
        exact
        path='/home/:pokeId'
        render={({ match }) => <PokemonDetail match={match} />}
      />
      <Route exact path='/home/create' component={CreatePokemon} /> */}
    </div>
  )
}

// Aca van las Rutas

export default App
