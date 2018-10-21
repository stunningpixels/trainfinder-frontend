import React, { Component } from 'react'

import DropDownSearch from '../DropDownSearch'

import JourneyService from '../../services/JourneyService'

import bgImage from '../../media/train.jpg'
import logo from '../../media/logo_white.png'

export default class Search extends Component {

  constructor() {
    super()
  }

  render(){
    return (
      <div style={{overflow: 'hidden', width: '100%', height: '100%', backgroundImage: "url(" + bgImage +")", backgroundSize: 'cover'}}>
        <div style={{display: 'table', textAlign: 'center', overflow: 'hidden', width: '100%', height: '100%', background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%,rgba(0,0,0,1) 100%)"}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', width: '100%'}}>
            <div style={{width: '300px', display: 'inline-block'}}>
              <img src={logo} style={{width: '100%'}} />
              <p>Thanks for using <b>TrainFinder</b>, I hope you found a deal. At the time of writing this, an off peak return to Exeter Central is £73.20 - over 36x more expensive than buying Megatrain advance fares. Please get in touch if you have any feedback, comments or just want to say hi : )</p>
              <p><b>~ <a href="https://twitter.com/LouisKnightWebb" target="_blank">Louis Knight-Webb</a></b></p>
              <p><i>{"If you're Megatrain or SWT, please don't sue me, just shoot me a message and we'll talk (i'm very reasonable)"}</i></p>
              <p>Copyright 2017 Knight-Webb Innovation Limited</p>
            </div>
          </div>
        </div>
      </div>
    )
  }


}
