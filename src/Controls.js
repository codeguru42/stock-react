import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class Controls extends Component {
  onSubmit = event => {
    alert('Submitted!');
  };

  render() {
    return (
      <div>
        <TextField
          label={'Stock Symbol:'}
          name={'symbol'}
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
