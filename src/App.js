import React, {Component} from 'react';
import * as d3 from "d3";
import './App.css';
import {Controls} from "./Controls";
import {Chart} from "./Chart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }


  onSubmit = values => {
    const {symbol} = values;
    d3.json(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=942TX8GNKGBPPZ1J`)
      .then(data => {
        this.setState({data: data['Time Series (5min)']});
      });
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
