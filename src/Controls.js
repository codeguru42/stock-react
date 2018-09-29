import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
    }
  }

  onChange = (key, value) => {
    this.setState(state => {
      return {...state, [key]: value}
    })
  };

  onSubmit = () => {
    alert(`symbol:${this.state.symbol}`);
  };

  render() {
    return (
      <div>
        <TextField
          label={'Stock Symbol:'}
          name={'symbol'}
          onChange={event => this.onChange('symbol', event.target.value)}
        />
        <Button
          variant={'contained'}
          onClick={this.onSubmit}
        >
          Submit
        </Button>
      </div>
    );
  }
}
