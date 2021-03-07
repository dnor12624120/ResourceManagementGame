import React, { Component } from 'react'
import Web3 from 'web3'

import './App.css'

import Plot from './abis/Plot.json'
import PlotRepository from './abis/PlotRepository.json'

import UserPlot from './UserPlot.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: [],
      fetching: false,
      size: 0
    }
  }

  async componentDidMount() {
    this.setState({fetching: true}, () => {
      this.loadData()
        .then(result => this.setState({fetching: false}))
    })
  }

  async loadData() {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      this.setState({account: accounts[0]})

      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({balance: balance})
      }
      else {
        window.alert('Please login with MetaMask')
      }

      try {
        const plotRepository = new web3.eth.Contract(PlotRepository.abi, PlotRepository.networks[netId].address)
        //const plot = new web3.eth.Contract(Plot.abi, Plot.networks[netId].address)
        const _plot =  await plotRepository.methods.plots(this.state.account).call()
        console.log(_plot)
        if(_plot.isSet) {
          this.setState({plot: new web3.eth.Contract(Plot.abi, _plot.plot)})
        }
        else {
          const plot = await plotRepository.methods.claimPlot(this.state.account).send({from: this.state.account})
          this.setState({plot: new web3.eth.Contract(Plot.abi, _plot.plot)})
        }
        const size = await this.state.plot.methods.size().call()
        const tiles = await this.state.plot.methods.getTiles().call()
        this.setState({size: size})
        this.setState({tiles: tiles})
      } catch (e) {
        window.alert(e)
      }

    } else {
      window.alert('Please install MetaMask')
    }
  }

  render() {
    const { plot, account, fetching, tiles } = this.state
    return (
      <div className="App">
        <p>Currently logged in with account: { this.state.account }</p>
        <p>Balance: { this.state.balance } </p>

        { fetching ?
           <p>Loading</p> :
           <div>
             <UserPlot tileData={tiles} plot={plot} account={account}/>
           </div>
        }
      </div>
    );
  }
}

export default App;
