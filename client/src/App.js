import './App.css'
import { Route } from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage.jsx'
import Pokemons from './Components/Pokemons/Pokemons.jsx'
import PokemonDetail from './Components/PokemonDetail/PokemonDetail.jsx'
import Navbar from './Components/NavBar/Navbar'
import CreatePokemon from './Components/CreatePokemon/CreatePokemon.jsx' 
function App () {
  return (
    <div className='App'>
      <Route  exact={true} path='/' component={LandingPage} />
      <Route   path='/home' component={Navbar} />
      <Route   path='/home' component={Pokemons} />
      <Route
        strict={true} path='/home/id/:pokeId'
        component={PokemonDetail} 
      />
      <Route  strict={true} path='/home/create' component={CreatePokemon} /> 
    </div>
  )
}

// Aca van las Rutas

export default App
