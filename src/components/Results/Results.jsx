import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import JourneyService from '../../services/JourneyService'

import bgImage from '../../media/train.jpg'
import logo from '../../media/logo_white.png'
import loader from '../../media/loader.svg'

import './Results.css'

export default class Results extends Component {

  constructor() {
    super()
    this.state = {
      results: [],
      loadedResults: false,
      outboundSelection: null,
      inboundSelection: null,
    }

    this.defaultLocations = JourneyService.getDefaultLocations()
    this.journeySelectHandler = this.journeySelectHandler.bind(this)
  }

  componentWillMount() {
    let {origin, destination} = this.props.match.params;
    axios.get('https://trainfinder.herokuapp.com/scrape?originCode=' + origin + '&destinationCode=' + destination + '&lookAhead=45')
      .then((response) => {
        this.setState({results: response.data, loadedResults: true})
      })
      .catch(() => this.setState({loadedResults: true}))
  }

  render(){
    let {origin, destination} = this.props.match.params
    let noResult = false
    let noResultCount = 0;
    return (
      <div>
          <div style={{verticalAlign: 'middle', textAlign: 'center', width: '100%'}}>
            <div style={{width: '300px', display: 'inline-block'}}>
              <img src={logo} style={{width: '100%', margin: '40px 0 0 0'}} />
              <div style={{marginBottom: '20px'}}>Showing results for <b>{this.defaultLocations[origin]}</b> to <b>{this.defaultLocations[destination]}</b></div>
              <div className="Results">
                {!this.state.loadedResults && <img src={loader}/>}
                {this.state.loadedResults && this.state.results.length === 0 && <p>No results found for this journey!</p>}
                {this.state.results.map((result, index) => {
                  if(!result.inbound.cheapest && !result.inbound.cheapest) {
                    return null
                  }
                  return <Result key={index} data={result} onJourneySelect={this.journeySelectHandler} />
                })}
              </div>
              <p>Copyright 2017 Knight-Webb Innovation Limited</p>
            </div>
        </div>

        <BookingDetails outboundSelection={this.state.outboundSelection} inboundSelection={this.state.inboundSelection} origin={origin} destination={destination} />

      </div>
    )
  }

  journeySelectHandler(direction, date, time, price) {
    if(direction === 'outbound') {
      this.setState({outboundSelection: {date, time, price}})
    }else if(direction === 'inbound') {
      this.setState({inboundSelection: {date, time, price}})
    }
  }

}

const BookingDetails = ({outboundSelection, inboundSelection, origin, destination, bookingComplete}) => {
  if(!outboundSelection) {
    return null
  }

  let url = "https://uk.megabus.com"

  return (
    <div className="BookingDetails">
      <table>
        <thead>
          <tr><th>Direction</th><th>Date</th><th>Time</th><th>Price</th></tr>
        </thead>
        <tbody>
          {outboundSelection && <tr><td>Outbound</td><td>{moment(outboundSelection.date, "DD/MM/YYYY").format('Do')} {moment(outboundSelection.date, "DD/MM/YYYY").format('MMMM')}</td><td>{outboundSelection.time}</td><td><span className="GBP">{outboundSelection.price.toFixed(2)}</span></td></tr>}
          {inboundSelection && <tr><td>Inbound</td><td>{moment(inboundSelection.date, "DD/MM/YYYY").format('Do')} {moment(inboundSelection.date, "DD/MM/YYYY").format('MMMM')}</td><td>{inboundSelection.time}</td><td><span className="GBP">{inboundSelection.price.toFixed(2)}</span></td></tr>}
        </tbody>
      </table>
      <a target="_blank" href={url} onClick={() => bookingComplete()}>Book!</a>
    </div>
  )
}

const Result = ({data, onJourneySelect}) => {

  let ResultHeight = 70;

  if(data.outbound.cheapest) {
    ResultHeight = ResultHeight + 36
  }

  if(data.inbound.cheapest) {
    ResultHeight = ResultHeight + 36
  }

  return (
    <div className="Result" style={{height: ResultHeight + 'px'}}>
      <div className="date" style={(moment(data.date, "DD/MM/YYYY").day() === 0 || moment(data.date, "DD/MM/YYYY").day() === 6) ? {color: "#257AFD"} : {}}>
        <span className="weekday">{moment(data.date, "DD/MM/YYYY").format('dddd')}</span>
        <span className="dayofmonth">{moment(data.date, "DD/MM/YYYY").format('Do')}</span>
        <span className="month">{moment(data.date, "DD/MM/YYYY").format('MMM')}</span>
      </div>
      <div className="outbound" style={{backgroundColor: getPriceColour(data.outbound.cheapest, 0.3)}}>
        {data.outbound.cheapest ? <span className="GBP">{data.outbound.cheapest.toFixed(2)}</span> : "No results"}<br/><span style={{fontSize: '12px'}}>Outbound &raquo;</span>
      </div>
      <div className="inbound" style={{backgroundColor: getPriceColour(data.inbound.cheapest, 0.3)}}>
        {data.inbound.cheapest ? <span className="GBP">{data.inbound.cheapest.toFixed(2)}</span> : "No results"}<br/><span style={{fontSize: '12px'}}>&laquo;  Inbound</span>
      </div>
      {data.outbound.cheapest && <div className="breakdown"><span>&raquo;</span>{data.outbound.journeys.map((journey, index) => <JourneyTime key={index} journey={journey} onSelect={() => onJourneySelect('outbound', data.date, journey.departs, journey.price)} />)}{data.outbound.journeys.length === 0 && <span style={{color: getPriceColour(null)}}>No results</span>}</div>}
      {data.inbound.cheapest && <div className="breakdown"><span>&laquo;</span>{data.inbound.journeys.map((journey, index) => <JourneyTime key={index} journey={journey} onSelect={() => onJourneySelect('inbound', data.date, journey.departs, journey.price)} />)}{data.inbound.journeys.length === 0 && <span style={{color: getPriceColour(null)}}>No results</span>}</div>}
    </div>
  )
}

const getPriceColour = (price, opacity = 1) => {
  if(price === null) {
    return "rgba(255, 109, 86, " + opacity + ")"
  }else if(price < 2) {
    return "rgba(52, 234, 131, " + opacity + ")"
  }else if(price < 10) {
    return "rgba(237, 233, 37, " + opacity + ")"
  }else {
    return "rgba(239, 192, 73, " + opacity + ")"
  }
}

const JourneyTime = ({index, journey, onSelect}) => (
  <span onClick={onSelect} style={{color: getPriceColour(journey.price)}}>{journey.departs}</span>
)
