import React, { Component } from 'react'
import './DropDownSearch.css'

export default class DropDownSearch extends Component {

  constructor() {
    super()
    this.state = {
      value: '',
      matches: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.getMatchingValues = this.getMatchingValues.bind(this)
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.matchesExactly = this.matchesExactly.bind(this)
  }

  render() {
    let {matches, selected} = this.state
    let {placeholder = "", style = {}} = this.props


    return (
      <div style={style} className="DropDownSearch">
        <input type="text" style={{width: '100%'}} placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange} onKeyPress={this.handleInputKeyPress} />
        <div className="matches">
          {!this.matchesExactly() && Object.keys(matches).map(function(keyName, keyIndex) {
            return (
              <div key={keyIndex} onClick={() => this.handleSelect(keyName)} className={selected === keyName && "selected"}>{matches[keyName]}</div>
            )
          }.bind(this))}
        </div>
      </div>
    )
  }

  handleInputChange(event) {
    let matches = this.getMatchingValues(event.target.value)
    let selected = null
    if(matches) {
      selected = Object.keys(matches)[0];
    }
    this.setState({value: event.target.value, matches, selected})
  }

  handleInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.handleSelect(this.state.selected)
    }
  }

  handleSelect(selected) {
    this.setState({value: this.props.values[selected]})
    this.props.onSelect(selected)
  }

  matchesExactly() {
    let {values = {}} = this.props
    for(let key in values) {
      if(this.state.value === values[key]) {
        return true
      }
    }
    return false
  }

  getMatchingValues(needle) {
    if(!needle) {
      return {}
    }
    let {values = {}} = this.props
    let matches = {}
    for(let key in values) {
      searchString(needle, values[key]) ? matches[key] = values[key] : null
      if(Object.keys(matches).length >= 3) {
        break;
      }
    }
    return matches
  }
}

const searchString = (needle, haystack) => {
  if (haystack.toLowerCase().indexOf(needle.toLowerCase()) != -1){
    return true
  }else {
    return false
  }
}
