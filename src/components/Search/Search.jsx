import React, { Component } from 'react'

import DropDownSearch from '../DropDownSearch'

import JourneyService from '../../services/JourneyService'

import swtImage from '../../media/swt_snow.jpg'
import logo from '../../media/logo_white.png'

export default class Search extends Component {

  constructor() {
    super()
    this.state = {
      origin: null,
      destination: null
    }

    this.handleOriginSelect = this.handleOriginSelect.bind(this)
    this.handleDestinationSelect = this.handleDestinationSelect.bind(this)
  }

  render(){
    return (
      <div style={{overflow: 'hidden', width: '100%', height: '100%', backgroundImage: "url(" + swtImage +")", backgroundSize: 'cover'}}>
        <div style={{display: 'table', textAlign: 'center', overflow: 'hidden', width: '100%', height: '100%', background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%,rgba(0,0,0,1) 100%)"}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', width: '100%'}}>
            <div style={{width: '300px', height: '300px', paddingTop: '150px', display: 'inline-block'}}>
              <img src={logo} style={{width: '100%'}} />
              <DropDownSearch onSelect={this.handleOriginSelect} style={{margin: '10px 0'}} placeholder="Origin" values={JourneyService.getDefaultLocations()}/>
              <DropDownSearch onSelect={this.handleDestinationSelect} style={{margin: '10px 0'}} placeholder="Destination" values={JourneyService.getDefaultLocations()} />
              <p style={{margin: '10px 0'}}>Find cheap South West Trains tickets for as little as £1 each way, this site presents Megatrain fares in a readable format.</p>
              <p>Copyright 2017 Knight-Webb Innovation Limited</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleOriginSelect(origin) {
    this.setState({origin})
    if(this.state.destination) {
      this.props.history.push("/results/" + origin + "/" + this.state.destination)
    }
  }

  handleDestinationSelect(destination) {
    this.setState({destination})
    if(this.state.origin) {
      this.props.history.push("/results/" + this.state.origin + "/" + destination)
    }
  }

}
