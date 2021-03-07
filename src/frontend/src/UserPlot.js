import React, { Component } from 'react'
import flower_grass from './img/flower_grass.png'
import grass from './img/grass.png'
import rock from './img/rock.png'
import water from './img/water.png'
import './UserPlot.css'

import TileDetail from './TileDetail.js'

class UserPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      byteToTileMapping: {
         50: water,
        180: grass,
        200: flower_grass,
        255: rock
      },
      tileData: props.tileData,
      selectedTileData: {}
    }
  }

  range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }


  bytesToTile(bytesValue) {
    for (const [key, value] of Object.entries(this.state.byteToTileMapping)) {
      if(parseInt(bytesValue) <= key) {
        return value
      }
    }
  }

  displayTileOptions(e, i, j) {
    e.preventDefault()
    this.setState({selectedTileData: {
      selected: true,
      i: i,
      j: j,
      value: this.state.tileData[i * 8 + j]
    }})
  }

  tileDetailHandleChange() {
  }

  render() {
    const { tileData, selectedTileData } = this.state
    return (
      <div>
        <div id="plot">
          <br/>
          <h2>Here's your plot</h2>
          <table>
            <tbody>
            { this.range(8, 0).map((ei, i) =>
               <tr> { this.range(8, 0).map((ej, j) =>
                  <td id={i} onClick={ (e) => this.displayTileOptions(e, i, j) }>
                    <img src={ this.bytesToTile(tileData[i * 8 + j]) }
                         width='64px'
                         height='64px'/>
                  </td>)
                 }
                </tr>)
            }
            </tbody>
          </table>
        </div>
        <div id="tileDetail">
        <TileDetail selectedTileData = { selectedTileData } plot = { this.props.plot }
          account = { this.props.account }/>
        </div>
      </div>
    );
  }
}
export default UserPlot;
