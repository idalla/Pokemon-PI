import  React  from 'react';
import { connect } from 'react-redux';
import { clearFilter, filterPokemonName } from '../../Redux/Actions/Actions';
import  './Buscador.css'

class Buscador extends React.Component{
constructor(props){
    super(props);
    this.state = {
        name:''}
}
componentDidUpdate() {
    if (this.state.name.length < 3) {
    this.props.clear()
    }
/* else if (this.state.name.length > 2) {
this.props.get(this.state.name.toLowerCase())
} */
}
handleOnChange = (e) => {
    e.preventDefault()
    this.setState({name: e.target.value})
}

handleSubmit = (e) => {
    e.preventDefault()
    this.props.get(this.state.name.toLowerCase())
}
    render() {
    return(
    <><input className='input' type='text' onChange={(e) => this.handleOnChange(e)}
    placeholder='Search your Pokemon!' value={this.state.name} />
    <button onClick={(e) => this.handleSubmit(e)}>Buscar</button>
    </>)
}
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        get: async (name) => await dispatch(filterPokemonName(name)),
        clear:  () =>  dispatch(clearFilter())
    }
}

export default connect(null, mapDispatchToProps)(Buscador)