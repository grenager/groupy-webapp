import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import App from './App';

// import GetmeList from './GetmeList'
// import uiState from './uiState'
import * as serviceWorker from './serviceWorker';

configure(true)

// DOM render tree
ReactDOM.render(<App />, document.getElementById('root'));

// getme apollo client observer
// ReactDOM.render(
//   <GetmeList uiState={uiState} />,
//   document.getElementById('root')
// )

// ReactDOM.render(<Gdrawer />, document.querySelector('#root'));

// serviceWorker for offline and load faster
serviceWorker.unregister();
