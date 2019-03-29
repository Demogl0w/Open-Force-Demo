import React, { Component } from 'react'
import { Provider } from 'react-redux'

import './App.css'
import store from './store'


class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Ron Swanson Musings</h1>
          </header>
     
        </div>
      </Provider>
    )
  }
}

export default App
