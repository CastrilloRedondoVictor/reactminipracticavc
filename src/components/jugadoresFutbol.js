import React, { Component } from 'react'
import axios from 'axios';

export default class JugadoresFutbol extends Component {

    selectEquipos = React.createRef();
    txtNombre = React.createRef();

    state = {
        equipos: [],
        jugadores: [],
    }


    componentDidMount = () => {
        axios.get('https://apiejemplos.azurewebsites.net/api/Equipos').then((response) => {
            this.setState({
                equipos: response.data
            })
        })
    }

    buscarJugadoresEquipo = (e) => {
        e.preventDefault()

        let equipo = this.selectEquipos.current.value

        axios.get('https://apiejemplos.azurewebsites.net/api/Jugadores/JugadoresEquipos/' + equipo).then((response) => {
            this.setState({
                jugadores: response.data
            })
        })
    }

    buscarJugadoresNombre = (e) => {
        e.preventDefault()

        let nombre = this.txtNombre.current.value

        axios.get('https://apiejemplos.azurewebsites.net/api/Jugadores/FindJugadores/' + nombre).then((response) => {
            this.setState({
                jugadores: response.data
            })
        })
    }

  render() {
    return (
      <div>

        <form onSubmit={this.buscarJugadoresNombre}>
        <input type="text" ref={this.txtNombre} />
        <button type="submit">BUSCAR POR NOMBRE</button>
        </form>

        <hr />

        <form onSubmit={this.buscarJugadoresEquipo}>
        <select ref={this.selectEquipos}>
            {
                this.state.equipos.map((equipo, index) => {
                    return(<option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>)
                })
            }
        </select>
        <button type="submit">BUSCAR JUGADORES</button>
        </form>

        <br />

        {
            this.state.jugadores.length > 0 ?
            (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>IMAGEN</th>
                            <th>NOMBRE</th>
                            <th>POSICIÓN</th>
                            <th>PAÍS</th>
                            <th>FECHA NACIMIENTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jugadores.map((jugador, index) => {
                                return(
                                    <tr key={index}>
                                        <td key={index + 1}><img src={jugador.imagen} style={{width: '150px'}}></img></td>
                                        <td key={index + 2}>{jugador.nombre}</td>
                                        <td key={index + 3}>{jugador.posicion}</td>
                                        <td key={index + 4}>{jugador.pais}</td>
                                        <td key={index + 5}>{jugador.fechaNacimiento}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            ):
            (
                <h2>SELECCIONA QUE JUGADORES MOSTRAR</h2>
            )
        }
      </div>
    )
  }
}
