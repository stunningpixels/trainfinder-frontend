import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga'
import createHistory from 'history/createBrowserHistory'

import './index.css';
import Shell from './components/Shell'

ReactGA.initialize('UA-87081438-2');

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

ReactDOM.render(
  <Shell history={history}/>,
  document.getElementById('root')
);
