import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import ReactGA from 'react-ga'

import Search from '../Search'
import Results from '../Results'
import Complete from '../Complete'

export default class Shell extends Component {

  constructor() {
    super();
  }

  componentWillMount() { // or componentDidMount
    this.updateAnalytics()
  }

  render() {
    return (
      <Router history={this.props.history}>
        <div style={{height: '100%'}}>
          <Route exact path="/" component={Search}/>
          <Route exact path="/complete" component={Complete}/>
          <Route exact path="/results/:origin/:destination" component={Results}/>
        </div>
      </Router>
    );
  }

  updateAnalytics() {
    console.log("NEW ROUTE")
  }

}
