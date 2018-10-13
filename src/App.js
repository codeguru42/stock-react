import React, {Component} from 'react';
import * as d3 from "d3";
import './App.css';
import AppBar from "@material-ui/core/es/AppBar/AppBar";
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
      .then(response => {
        const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');
        const time_series = response['Time Series (5min)'];
        const data = Object.keys(time_series).sort().map(
          function (key) {
            const data = time_series[key];
            return {
              time: parseTime(key),
              open: Number(data['1. open']),
              high: Number(data['2. high']),
              low: Number(data['3. low']),
              close: Number(data['4. close']),
              volume: Number(data['5. volume']),
            };
          }
        );

        this.setState({data: data});
      });
  };

  render() {
    return (
      <div className="App">
        <AppBar position={'static'}>
          <h1 className="App-title">Stock Price Visualizations</h1>
        </AppBar>
        <Controls
          onSubmit={this.onSubmit}
        />
        <Chart
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
