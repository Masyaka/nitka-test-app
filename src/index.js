import React from 'react';
import { render } from 'react-dom';
import SeatsSelect from './components/SeatsSelect'
import './index.scss'
import { seatStates } from "./components/Seat";

const rowsCount = 10;
const rowSeatsCount = 10;

render(
  <div>
    <SeatsSelect
      rowsCount={rowsCount}
      rowSeatsCount={rowSeatsCount}
      onCreate={(component) => {
        const randomFilledSeats = {};
        for (let i = 0; i < 10; i++){
          const randomSeatNumber = Math.round(Math.random() * (rowsCount * rowSeatsCount));
          if (randomFilledSeats[randomSeatNumber]){
            i--;
          } else {
            randomFilledSeats[randomSeatNumber] = true;
          }
        }

        Object.keys(randomFilledSeats).forEach(key => {
          const keyNumber = Number(key);
          const seatNumber = keyNumber % rowSeatsCount;
          const rowNumber = Math.floor(keyNumber / rowSeatsCount);
          component.state.rows[rowNumber][seatNumber] = seatStates.occupied;
        });
      }}
    />
  </div>,
  document.getElementById('root')
);
