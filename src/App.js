import React, {Component} from 'react';
import './App.css';
import {Controls} from "./Controls";
import {Chart} from "./Chart";

class App extends Component {
  onSubmit = values => {
    alert(`symbol:${values.symbol}`);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stock Price Visualizations</h1>
        </header>
        <Controls
          onSubmit={this.onSubmit}
        />
        <Chart/>
      </div>
    );
  }
}

export default App;
