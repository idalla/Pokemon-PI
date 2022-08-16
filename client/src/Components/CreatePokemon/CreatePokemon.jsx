import  React  from 'react'
import { connect } from 'react-redux';
import { getAllPokemon, getType, postPokemon } from '../../Redux/Actions/Actions';
import s from './CreatePokemon.module.css'
import { Link } from 'react-router-dom';
class CreatePokemon extends React.Component {
    constructor(props) {
        super(props) 
        this.state= {
            name: '',
            life: '',
            attack: '',
            defense:'',
            speed:'',
            height: '',
            weight:'',
            firstType: '',
            secondType:'',
            imgType:'',
            img: '',
            errors: {}

        }
    }
    validate(input) {
        let error = {};
        let extension = ['png', 'jpg', 'gif']
        let imagen = input.img.split('.')
        if(!input.name || !input.attack || !input.life || !input.defense || !input.speed || !input.height || !input.weight) {
            error.filling = 'Faltan datos'
        } 
        else if(parseInt(input.attack) < 1 || parseInt(input.attack) > 100) {
    error.attack = 'el ataque debe ser entre 1 y 100'
 }
  else if(parseInt(input.life) < 1 || parseInt(input.life) > 100) {
    error.life = 'la vida debe ser entre 1 y 100'
 }
  else if(parseInt(input.defense) < 1 || parseInt(input.defense) > 100) {
    error.defense = 'la defensa debe ser entre 1 y 100'
 }
  else if(parseInt(input.speed) < 1 || parseInt(input.speed) > 100) {
    error.speed = 'la velocidad debe ser entre 1 y 100'
 }
  else if(parseInt(input.height) < 1 || parseInt(input.height) > 100) {
    error.height = 'la altura debe ser entre 1 y 100'
 }
  else if(parseInt(input.weight) < 1 || parseInt(input.weight) > 100) {
    error.weight = 'el peso debe ser entre 1 y 100'
 } 
else if (input.firstType === 'Select') {
    error.firstType= 'Tenes que elegir un tipo'
}
else if (input.firstType === '') {
    error.firstType= 'Tenes que elegir un tipo'
}
else if(input.img) {
  if ( !extension.includes( imagen[imagen.length-1] )) {
    error.img = 'tiene que ser una de las extensiones permitidas'
 }}
  return error;
}

async componentDidMount(){
    await this.props.getType()
    let valerror = this.validate(this.state)
    this.setState({...this.state, errors: valerror})


}
options = (type) => {
type.map(e => {
  return(<option value={e.id}>{e.name}</option>)

})

}

componentWillUnmount() {
window.location.reload()
}



handleOnChange = async (e) => {
    await this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
    });
    
    let valerror = this.validate(this.state)
    this.setState({...this.state, errors: valerror})
/*     let error = this.validate({
      ...this.state,
      [e.target.name]: e.target.value,
    })
    this.setState({...this.state,
    errors: error})
    return error */
}
handleSubmit = async (e) => {
    e.preventDefault()
    if(this.state.secondType === undefined || this.state.secondType === '' || this.state.secondType === 'Select') {
   await this.props.create(this.state.name, this.state.life, this.state.attack, this.state.defense, this.state.speed, this.state.height, this.state.weight, [this.state.firstType], this.state.img)
}
else {
     await this.props.create(this.state.name, this.state.life, this.state.attack, this.state.defense, this.state.speed, this.state.height, this.state.weight,[ this.state.firstType, this.state.secondType], this.state.img )
}
    
}

render() {
    return(
        <div className={s.container}>
            <form className={s.cartel} onSubmit={(e) => this.handleSubmit(e)}>
                 <Link to='/home'>
                <button  style={{ fontSize: 'medium' }} className={s.closeBoton}>
                  X
                </button>
              </Link>
                <label>Nombre: </label>
                    <input
                        style={(this.props.errors && this.props.errors.name) ? {borderColor: 'red'} : {}}
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => this.handleOnChange(e)}
        />

        
                <label>Vida: </label>
                    <input className={s.range}
                        style={{backgroundColor: 'transparent'}}
                        id="life"
                        type="range"
                        name="life"
                        value={this.state.life}
                        onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'
        />
        <input type="number" id="life" name="life" value={this.state.life} onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'/>
                <label >Ataque: </label>
                     <input
                     style={{backgroundColor: 'transparent'}}
                        id="attack"
                         type='range'
                         name="attack"
                         value={this.state.attack}
                         onChange={(e) => this.handleOnChange(e)}
                         min='1'
                         max='100'
         />
         <input type="number" id="attack" name="attack" value={this.state.attack} onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'/>
                <label>Defensa: </label>
                     <input
                     style={{backgroundColor: 'transparent'}}
                        id="defense"
                         type='range'
                         name="defense"
                         value={this.state.defense}
                         onChange={(e) => this.handleOnChange(e)}
                         min='1'
                         max='100'
         />
          <input type="number" id="defense" name="defense" value={this.state.defense} onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'/>
                <label>Velocidad: </label>
                     <input
                     style={{backgroundColor: 'transparent'}}
                        id="speed"
                         type='range'
                         name="speed"
                         value={this.state.speed}
                         onChange={(e) => this.handleOnChange(e)}
                         min='1'
                         max='100'
         />   
          <input type="number" id="speed" name="speed" value={this.state.speed} onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'/>
                <label>Altura: </label>
                     <input
                     style={{backgroundColor: 'transparent'}}
                        id="height"
                         type='range'
                         name="height"
                         value={this.state.height}
                         onChange={(e) => this.handleOnChange(e)}
                         min='1'
                         max='100'
         />
          <input type="number" id="height" name="height" value={this.state.height} onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'/>
                <label>Peso: </label>
                     <input
                     style={{backgroundColor: 'transparent'}}
                        id="weight"
                         type='range'
                         name="weight"
                         value={this.state.weight}
                         onChange={(e) => this.handleOnChange(e)}
                         min='1'
                         max='100'
         />  
          <input type="number" id="weight" name="weight" value={this.state.weight} onChange={(e) => this.handleOnChange(e)}
                        min='1'
                        max='100'/>
         <label>Tipo principal de pokemon: </label>
                <select  style={{textAlign: 'center'}}
                name="firstType" 
                id="firstType" 
                value={this.state.firstType} 
                onChange={e => this.handleOnChange(e)}>
                 <>
                 <option value="Select">Select</option>
                 {this.props.type.map(e => {
                    if (e.id >= 1 && e.id < 21){ 
                        return (<option key={e.id} value={e.name}>{e.name}</option>)
                        }
                        })/*  this.options(this.props.type) */}</>
                  </select>   
                  <label>Tipo secundario de pokemon: </label>
                <select  style={{textAlign: 'center'}}
                name="secondType" 
                id="secondType" 
                value={this.state.secondType} 
                onChange={e => this.handleOnChange(e)}>
                 <>
                 <option value="Select">Select</option>
                 {this.props.type.filter(e => e.name !==  this.state.firstType).map(e => {
                    if (e.id >= 1 && e.id < 21){ 
                        return (<option key={e.id} value={e.name}>{e.name}</option>)
                        }
                        })/*  this.options(this.props.type) */}</>
                  </select>  
                 
                <><label>Imagen: </label>
                     <input
                         type='text'
                         name="img"
                         value={this.state.img}
                         onChange={(e) => this.handleOnChange(e)}
         /></>
                                    
        {(Object.keys(this.state.errors).length > 0) ? (<button disabled type='submit'>Crear</button>) : (<button  type='submit'>Crear</button> )}
            </form>
            </div>
        
    )
}
};
const mapStateToProps = (state) => {
    return {
        pokemons: state.Pokemons,
        type: state.Types
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
    create: (name, life, attack, defense, speed, height, weight, type, img) => dispatch(postPokemon(name, life, attack, defense, speed, height, weight, type, img)),
    getType: () => dispatch(getType()),
    getAll: () => dispatch(getAllPokemon())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePokemon)
