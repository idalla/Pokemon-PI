import React from 'react'
import Pokemon from '../Pokemon/Pokemon'
import { getAllPokemon,/*  getPokemonById, */  } from '../../Redux/Actions/Actions.js';
import { connect } from "react-redux";
import s from './Pokemons.module.css'



 class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pokeXpage: 12,
    }
  } 

cargando = (state) => {
  let loadingStyle;
  (state.length < 1) ?
  loadingStyle = {
    visibility: 'visible',
    position: 'relative',
    top: "20px",
    right: '0px',
    width:'30vh'
    
  } :
  loadingStyle = {
    visibility: 'hidden',
    width:'0px',
    height:'0px'
    
  }
  return(
    <img style={loadingStyle} src="https://i.giphy.com/media/5AtXMjjrTMwvK/giphy.gif" alt="loading" />
  )

}


  handleOnClick = (event) => {
    this.setState({...this.state,
      current: Number(event.target.id)
    })
  }
 componentDidMount (){

   this.props.getPokemons()

  }

  render () {
   
if (this.props.pokemons) { 
      const {current, pokeXpage} = this.state
      const lastPoke = current * pokeXpage
      const firstPoke= lastPoke - pokeXpage
  
    const currentsPokemons = this.props.pokemons.slice(firstPoke, lastPoke)
    const renderPokemons = currentsPokemons.map(poke => {
      return poke.id.length > 3 ? (!poke.Types[1] ?
              (<Pokemon className={s.Pokemon}
                id={poke.id}
                key={poke.id}
                name={poke.name}
                firstType={poke.Types[0].name}
                img={poke.img}
                firstImgType={poke.Types[0].typeImg}
                />) :
              (<Pokemon className={s.Pokemon}
                id={poke.id}
                key={poke.id}
                name={poke.name}
                firstType={poke.Types[0].name}
                secondType={poke.Types[1].name}
                img={poke.img}
                firstImgType={poke.Types[0].typeImg}
                secondImgType={poke.Types[1].typeImg}
                />))
                : 
            (<Pokemon className={s.Pokemon}
              id={poke.id}
              key={poke.id}
              name={poke.name}
              firstType={poke.firstType}
              secondType={poke.secondType}
              img={poke.img}
              firstImgType={poke.firstImgType}
              secondImgType={poke.secondImgType}
            />)
           
              
            })
    

const pageNumbers = [];
    for (let i = 1; i <= Math.ceil( this.props.pokemons.length / pokeXpage ); i++) {
      pageNumbers.push(i);
    }

const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div className={s.Pagina}
          key={number}
          id={number}
          onClick={ this.handleOnClick }
        >
          {number}
        </div>
      );
    })
    return (
      <div className={s.general} >
        <div className={s.pokemons}>
          {renderPokemons}
        </div>
        {pageNumbers.length > 1 && (<div className={s.Pagina} >
          {renderPageNumbers}
        </div>)}
        <div /* style={{position: 'absolute'}} */>{this.cargando(this.props.pokemons)}</div>
      </div>
    )
  }
  }
}

const mapStateToProps = (state) => {
  return {
    pokemons: state.PokemonFilter,
    loading: state.Loading
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemons: () => dispatch(getAllPokemon()),
 /*    getPokemonById:  (id) => dispatch(getPokemonById(id)), */
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pokemons)