import  React  from 'react';
import './Navbar.css';
import Buscador from './../Buscador/Buscador';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterPokemon } from '../../Redux/Actions/Actions';
import { FILTER_AS, FILTER_AT, FILTER_AZ, FILTER_DES } from '../../Redux/Actions/type';

 class Navbar extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    show: false
  }
  this.myRef = React.createRef();
}


render()
{
  let az = 'A -> Z'
  let za = 'Z -> A'
    return (
    <div className="general" >
        <div  >
       <img className='logo' style={{width: '250px'}} src="https://i.postimg.cc/FFGD5MyP/PokeDeX.png" alt="Pokedex" />
        </div>
        <div className='pintado'>
          <select > 
            <option value="Select">Select</option>
            <option value={this.props.filter(FILTER_AZ)}>{az}</option>
            <option value={() => this.props.filter(FILTER_DES)}>{za}</option>
            <option value={() => this.props.filter(FILTER_AT)}>Por ataque</option>
          </select>
          <button className="lupa" onClick={() => this.setState({...this.state, 
          show: !this.state.show})}>
          <img
            className="lupa"
            src="https://images.vexels.com/media/users/3/132068/isolated/lists/f9bb81e576c1a361c61a8c08945b2c48-icono-de-busqueda.png"
            alt="lupa"
          />
        </button>
        <div className='search' style={this.state.show ? { width: `180px` } : { width: "0px" }} ref={this.myRef}><Buscador></Buscador></div>
         <NavLink   to='/home/create' className='goTo'>
              <button
                className='boton'
              >
                Crear Pokemon
              </button>
            </NavLink>

        </div>

    </div>
)

}


} 
const mapDispatchToProps = (dispatch) => {
  return {
    filter: (fil) => dispatch(filterPokemon(fil))
  }

}

export default connect(null, mapDispatchToProps)(Navbar)