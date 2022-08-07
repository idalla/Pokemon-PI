import React from 'react'
import s from './PokemonDetail'
/* import { Link } from 'react-router-dom' */
export default class PokemonDetail extends React.Component {
  render () {
    return (
      <div className={s.container}>
        {/* <div className={s.cartel}>
          <div className={s.text}>
            <div>
              <Link to='/home'>
                <button style={{ fontSize: 'medium' }} className={s.closeBoton}>
                  X
                </button>
              </Link>
              <h1>{city.name}</h1>
            </div>
            <div>
              <div>Temperatura: {city.temp} °C</div>
              <div>Clima: {city.weather}</div>
              <div>Viento: {city.wind} km/h</div>

              <div>Cantidad de nubes: {city.clouds}%</div>
              <div>Pais: {city.country}</div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
};
