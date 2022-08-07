import React from 'react'
import Pokemon from '../Pokemon/Pokemon'
import { getAllPokemon, getPokemonById, isLoading } from '../../Redux/Actions/Actions.js';
import { connect } from "react-redux";
 class Pokemons extends React.Component {
   componentDidMount (){
      this.props.isLoading()
     this.props.getPokemons()
      this.props.isLoading()
       this.props.getPokemonById()
  
    

  }
  render () {
    if (this.props.Loading === true) {
      return (<img src='https://i.postimg.cc/NfhM3JrT/giphy-1.gif' alt="" />)
    }
   else{
      return (
        <div className='Pokemons'>
          {this.props.pokemons.map((c) => (
            <Pokemon
              id={c.id}
              key={c.id}
              name={c.name}
              firstType={c.firstType}
              secondType={c.secondType}
              img={c.img}
              firstImgType={c.firstImgType}
              secondImgType={c.secondImgType}
            />
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
return {pokemons: state.Pokemons,
Loading: state.Loading}
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemons: () => dispatch(getAllPokemon()),
    getPokemonById:  () => dispatch(getPokemonById),
   isLoading: () => dispatch(isLoading())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pokemons)