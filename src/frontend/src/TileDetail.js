import React, { Component } from 'react'
import './TileDetail.css'
import { tileinfo } from './tileinfo.js'

class TileDetail extends Component {
  constructor(props) {
    super(props)
    this.bytesToTile = this.bytesToTile.bind(this)
  }


  bytesToTile(bytesValue) {
    for (const [key, value] of Object.entries(tileinfo)) {
      if(parseInt(bytesValue) <= key) {
        return value
      }
    }
  }

  render() {
    const selectedTileData = this.props.selectedTileData
    return (
      <div id="tileDetail">
        <br/><br/><br/><br/><br/><br/>
        {
          selectedTileData.selected ?
          <div>
            <p>{ this.bytesToTile(selectedTileData.value).name }</p>
            <p><i>{ this.bytesToTile(selectedTileData.value).info }</i></p>
            {
              this.bytesToTile(selectedTileData.value).hasButton ?
              <button onClick={
                () => this.bytesToTile(selectedTileData.value).action(
                  selectedTileData.i,
                  selectedTileData.j,
                  this.props.plot,
                  this.props.account)
                }>
                { this.bytesToTile(selectedTileData.value).buttonText }
              </button> :
              <p></p>
            }
          </div> :
          <p>No tile selected</p>
        }
      </div>
    )
  }
}

export default TileDetail;
