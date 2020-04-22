import React from 'react';
import './App.css';
import Header from './header/Header'
import Items from './items/Items'

class App extends React.Component {
  render() {
    return <div><Header /><Items /></div>
  }
}

export default App;
