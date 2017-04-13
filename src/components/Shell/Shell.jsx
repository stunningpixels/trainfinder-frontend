import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Search from '../Search'
import Results from '../Results'
import Complete from '../Complete'

export default class Shell extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{height: '100%'}}>
          <Route exact path="/" component={Search}/>
          <Route exact path="/complete" component={Complete}/>
          <Route exact path="/results/:origin/:destination" component={Results}/>
        </div>
      </BrowserRouter>
    );
  }

}
