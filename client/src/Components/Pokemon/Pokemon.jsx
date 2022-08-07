import React from 'react'
 import { Link } from 'react-router-dom'
import s from './Pokemon.module.css' 

export default class Card extends React.Component {
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
    return   (<div
        className={s.card}
        style={{
          backgroundColor: backgrounColour[this.props.firstType]
        }}
        >
          <img src={this.props.img} alt="" />
        <img src={this.props.firstImgType} alt="" />
        {this.props.secondImgType && 
        (<img src={this.props.secondImgType} alt="" />) 
        }
        <div
          className={s.cardbody}
        >
          <Link to={`/home/${this.props.id}`}>
            <h4>{this.props.name}</h4>
          </Link>
          
        </div>
      </div> )
  }
}
