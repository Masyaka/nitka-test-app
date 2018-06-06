import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const seatStates = {
  free: 'free',
  occupied: 'occupied',
  reserved: 'reserved',
};

export class Seat extends PureComponent{

  static propTypes = {
    state: PropTypes.oneOf(Object.keys(seatStates)),
    rowNumber: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    state: seatStates.free, 
  };

  constructor(props){
    super(props);
  }

  onClick = () => {
    this.props.onClick(this.props.rowNumber, this.props.number, this.props.state)
  };

  render(){
    return (
      <div 
        className={'seat__seat-container seat__seat-container__state-' + this.props.state}
        onClick={this.onClick}
      >
        {this.props.number + 1}
      </div>
    )
  }
}

export default Seat;