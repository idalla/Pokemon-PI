import React from 'react'
import { NavLink } from 'react-router-dom';
import s from './LandingPage.module.css';

class LandingPage extends React.Component {
  render () {
    return (
      <div className={s.general}>
        <img src="https://i.postimg.cc/FFGD5MyP/PokeDeX.png" alt="Pokedex" />
        <img  className={s.radar} src="https://i.postimg.cc/3N43GnTh/findAll.gif" alt="Pokedex" />
          <div className={s.content}>
            <NavLink to='/home' className={s.goTo}>
              <button
                className={s.boton}
              >
                Home
              </button>
            </NavLink>
          
        </div>
      </div>
    )
  }
}

export default LandingPage
