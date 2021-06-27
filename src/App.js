import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './components/Forms'


 class App extends Component {
  render() {
    return (
      <div className="App">
      
       <header >
          <h1>City Explorer </h1>
        </header>
       
       <Forms />
      </div>
    )
  }
}

export default App
