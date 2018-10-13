import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import * as constants from "./constants";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class Controls extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {
        symbol: '',
      }
    }
  }

  onChange = (key, value) => {
    this.setState(state => {
      return {
        ...state,
        input: {
          ...state.input,
          [key]: value
        }
      }
    });

    fetch(`${constants.SEARCH_URL}&keywords=${value}`)
      .then(results => {
        return results.json();
      })
      .then(matches => {
        this.setState({matches: matches.bestMatches});
      });
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
          onClick={() => this.props.onSubmit(this.state.input)}
        >
          Submit
        </Button>
      </div>
    );
  }
}
