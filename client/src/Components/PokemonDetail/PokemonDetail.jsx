import React from 'react'
import './PokemonDetail.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearDetail } from '../../Redux/Actions/Actions'



 class PokemonDetail extends React.Component {

  componentWillUnmount() {

    this.props.clear()

  }

cargando = (state) => {
  let loadingStyle;
  (state === undefined) ?
  loadingStyle = {
    visibility: 'visible',
    position: 'relative',
    top:"130px",
    right: '550px',
    width:"400px",
    height:'400px'
    
  } :
  loadingStyle = {
    visibility: 'hidden',
    position: 'relative',
    bottom:"20px",
    right: '750px'
    
  }
  return(
    <>
    <img style={loadingStyle} src="https://i.giphy.com/media/5AtXMjjrTMwvK/giphy.gif" alt="loading" />
    {/* <img style={loadingStyle} src="https://i.postimg.cc/65bsYrJc/mr-mime.gif" alt="loading" /> */} </>
  )

}

barras = (completed, name) => {
   const containerStyles = {
         height: "20px",
         width: '80%',
         backgroundColor: "#e0e0de",
         borderRadius: "50px",
         margin: "10px",
         gridArea: ' 1 / 2'
       }
       let fillerStyles;
       completed === undefined ?
        fillerStyles = {
         height: '100%',
         width: `0%` ,
         backgroundColor: '#8ac926',
         borderRadius: 'inherit',
         textAlign: 'right',
         transition: 'width 1s',
       } :
       fillerStyles = {
         height: '100%',
         width: `${completed/1.5}%` ,
         backgroundColor: '#8ac926',
         borderRadius: 'inherit',
         textAlign: 'right',
         transition: 'width 1s',
       }
     
       const labelStyles = {
         padding: '5px',
         color: 'white',
         fontWeight: 'bold'
       }
return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 0.4fr)', gridColumnGap: '0px'}}>
      <span style={{fontWeight: 'bolder', fontSize: '24px', gridArea: ' 1 / 1'}}>{name}:</span>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          {completed === undefined ? <span style={labelStyles}>{`0`}</span> : <span style={labelStyles}>{`${completed}`}</span>}
          
        </div>
      </div>
    </div>
    
  )

}
typeImage = (poke) => {
  if(poke.id !== undefined) {
  if (poke.id.length > 3) {
    console.log("🚀 ~ file: PokemonDetail.jsx ~ line 94 ~ PokemonDetail ~ poke.id", poke.id)
    console.log("🚀 ~ file: PokemonDetail.jsx ~ line 97 ~ PokemonDetail ~ this.props.pokeInfo.Types[0]?.imgType", this.props.pokeInfo.Types[0].typeImg)
    return this.props.pokeInfo.Types[1] ? 
        (<>
        <img className='imgType' src={(this.props.pokeInfo.Types[0]?.typeImg)} alt="" />
        <img className='imgType' src={this.props.pokeInfo.Types[1]?.typeImg} alt="" />
        </>) : (<img className='imgType' src={this.props.pokeInfo.Types[0]?.typeImg} alt="" />)
  }
  else {
    return this.props.pokeInfo.secondImgType ? 
        (<>
        <img className='imgType' src={this.props.pokeInfo.firstImgType} alt="" />
        <img className='imgType' src={this.props.pokeInfo.secondImgType} alt="" />
        </>) : 
        ( <img className='oneImgType' src={this.props.pokeInfo.firstImgType} alt="" />)
  }}
}

image = (poke) => {
const backgrounColour = {
       bug: '#99d98c',
  dark: '#00509d',
  dragon: '#73d2de',
  electric: '#ffbc42',
  fairy: '#ff758f',
  fighting: '#e09f3e',
  fire: '#d62828',
  Flying: '#3c6e71',
  ghost: '#c77dff',
  grass: '#57cc99',
  ground: '#e6beae',
  ice: '#9bf6ff',
  normal: '#ffccd5',
  poison: '#7b2cbf',
  psychic: '#a8577e',
  rock: '#c44536',
  steel: '#b8d0eb',
  water: '#2ec4b6' 
    }



  if (poke.id!== undefined) {
    let style;
    poke.id.length > 3 ?
    style = {
      backgroundColor: backgrounColour[poke.Types[0].name]
      
    } :
    style = {
      backgroundColor: backgrounColour[poke.firstType]
    }
   
return (
  <img className="img" style={style} src={poke.img} alt="type" />
)
    
  }
}

  render () {
  /*    const backgrounColour = {
       bug: '#99d98c',
  dark: '#00509d',
  dragon: '#73d2de',
  electric: '#ffbc42',
  fairy: '#ff758f',
  fighting: '#e09f3e',
  fire: '#d62828',
  Flying: '#3c6e71',
  ghost: '#c77dff',
  grass: '#57cc99',
  ground: '#e6beae',
  ice: '#9bf6ff',
  normal: '#ffccd5',
  poison: '#7b2cbf',
  psychic: '#a8577e',
  rock: '#c44536',
  steel: '#b8d0eb',
  water: '#2ec4b6' 
    } */
   
    if (this.props.pokeInfo){
   return  (
   <>
   <div  className="container">
        <div className='cartel'>
                {this.image(this.props.pokeInfo)}
          <div className='text'>
            <div>
              <Link to='/home'>
                <button  style={{ fontSize: 'medium' }} className="closeBoton">
                  X
                </button>
              </Link>
              <h1>{this.props.pokeInfo.name}</h1>
            </div>
              <div>
                <div>{this.barras(this.props.pokeInfo.life, 'Vida')}</div>
                <div>{this.barras(this.props.pokeInfo.attack, 'Ataque')}</div>
                <div>{this.barras(this.props.pokeInfo.defense, 'Defensa')}</div>
                <div>{this.barras(this.props.pokeInfo.speed, 'Velocidad')}</div>
                <div style={{fontWeight: 'bolder', fontSize: '24px'}}>Altura: {this.props.pokeInfo.height}</div>
                <div style={{fontWeight: 'bolder', fontSize: '24px'}}>Peso: {this.props.pokeInfo.weight}</div>
                 <div className="imgType" >
        {this.typeImage(this.props.pokeInfo)}
       
        </div>
              </div>
          </div>
          <div style={this.props.pokeInfo.life ===undefined ? {  width: '10000px',
  height: '100vh',
  backdropFilter: 'blur(10px)'} : {}}>
    <div >{ this.cargando(this.props.pokeInfo.life)}</div></div>
        </div>
      </div></>
    )}
  }
};

const mapStateToProps = (state) =>{
  return {
    pokeInfo: state.PokemonDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(clearDetail())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail)