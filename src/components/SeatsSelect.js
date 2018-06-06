import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Seat, { seatStates } from './Seat';

export class SeatsSelect extends Component{
  
  static propTypes = {
    rowsCount: PropTypes.number,
    rowSeatsCount: PropTypes.number,
    onCreate: PropTypes.func,
  };
  
  static defaultProps = {
    rowsCount: 10,
    rowSeatsCount: 10,
    seatsStates: {},
  };
  
  constructor(props){
    super(props);

    const rows = new Array(props.rowsCount);

    for (let rowNumber = 0; rowNumber < props.rowsCount; rowNumber++){
      const newRow = new Array(props.rowSeatsCount);
      rows[rowNumber] = newRow;
      for (let seatNumber = 0; seatNumber < props.rowSeatsCount; seatNumber++){
        newRow[seatNumber] = seatStates.free;
      }
    }
    
    this.state = {
      rows
    };
    
    if (props.onCreate) {
      props.onCreate(this);
    }
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.rows !== this.state.rows){
      this.setState({ rows: nextProps.rows })
    } 
  }

  onSeatClick = (rowNumber, seatNumber, seatState) => {
    if (seatState === seatStates.occupied) return;

    this.state.rows[rowNumber][seatNumber] = seatState === seatStates.reserved ? seatStates.free : seatStates.reserved;
    this.setState({
      rows: [...this.state.rows]
    });
  };
  
  getSelectedSeats = () => {
    return this.state.rows.reduce((result, row, rowIndex) => {
      return [
        ...result,
        ...row.reduce((rowResult, seatState, seatIndex) => {
          if (seatState === seatStates.reserved) rowResult.push({ row: rowIndex, seat: seatIndex});
          return rowResult;
        }, [])
      ]; 
    }, [])
  };
  
  onCancel = () => {
    this.getSelectedSeats().forEach( ss => this.state.rows[ss.row][ss.seat] = seatStates.free);
    this.setState({ rows: [...this.state.rows] });
  };
  
  onBuy = () => {
    this.getSelectedSeats().forEach( ss => this.state.rows[ss.row][ss.seat] = seatStates.occupied);
    this.setState({ rows: [...this.state.rows] });
    alert('Спасибо за заказ!');
  };
  
  render(){
    const selectedSeats = this.getSelectedSeats();
    return (
      <div className="seat-select">
        <h2>Касса кинотеатра</h2>
        <div className="seat-select__content">
          <div className="seat-select__seats">
            {this.state.rows.map((row, rowNumber) => {
              return(
                <div key={rowNumber} className="seat-select__row">
                  <div className="seat-select__row-number">{rowNumber + 1}</div>
                  {row.map((seatState, seatNumber) => {
                    return (
                      <Seat
                        number={seatNumber}
                        rowNumber={rowNumber}
                        key={seatNumber}
                        state={seatState}
                        onClick={this.onSeatClick}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="seat-select__info">
            <div>
              Вы выбрали места: {selectedSeats.map(ss => `ряд ${ss.row + 1} место ${ss.seat + 1}`).join(', ')}
            </div>
            <div>
              Общая стоимость: {selectedSeats.length * 100}   
            </div>
          </div>  
        </div>
        <div>
          <button onClick={this.onCancel}>Отмена</button>
          <button onClick={this.onBuy}>Купить</button>
        </div>
      </div>
    )
  }
}

export default SeatsSelect;