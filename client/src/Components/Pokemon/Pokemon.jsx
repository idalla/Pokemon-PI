import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDetail } from '../../Redux/Actions/Actions'
import s from './Pokemon.module.css' 


class Pokemon extends React.Component {


  render () {
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
    const name = this.props.name
    let firt= name.split('')
    let first = firt.shift()
    let upper = first.toUpperCase()
    firt.unshift(upper)
    let names = firt.concat("")
if (this.props.firstType !== undefined) {
    return   (<div
        className={s.card}
        style={{
          backgroundColor: backgrounColour[this.props.firstType]
        }}
        >
          <Link  onClick={async() => await this.props.getDetails(this.props.id)} style={{textDecoration: 'none'}} strict to={`/home/id/${this.props.id}`}>
            <h2 className={s.name}>{names}</h2>
           
          <img className={s.img} src={this.props.img} alt="" />
            
          </Link>
       <div className={s.imgType} >
        {this.props.secondImgType ? 
        (<>
        <img className={s.imgType} src={this.props.firstImgType} alt="" />
        <img className={s.imgType} src={this.props.secondImgType} alt="" />
        </>) : 
        ( <img className={s.oneImgType} src={this.props.firstImgType} alt="" />)
        }
        </div>
        <div
          className={s.cardbody}
          >
          
        </div>
      </div> )}
      else {
          return   (<div
        className={s.card}
        style={{
          backgroundColor: backgrounColour[this.props.firstType]
        }}
        >
          <Link  onClick={async() => await this.props.getDetails(this.props.id)} style={{textDecoration: 'none'}}  to={`/home/id/${this.props.id}`}>
            <h2 className={s.name}>{names}</h2>
           
          <img className={s.img} src={this.props.img} alt="" />
            
          </Link>
       <div className={s.imgType} >
        {this.props.Types[1] ? 
        (<>
        <img className={s.imgType} src={this.props.Types[0]?.imgType} alt="" />
        <img className={s.imgType} src={this.props.Types[1]?.imgType} alt="" />
        </>) : 
        ( <img className={s.oneImgType} src={this.props.firstImgType} alt="" />)
        }
        </div>
        <div
          className={s.cardbody}
          >
          
        </div>
      </div> )

      }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
   getDetails: async (id) => await dispatch(getDetail(id)),
  }
}

export default connect(null, mapDispatchToProps)(Pokemon)