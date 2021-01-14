import React from 'react';
import './square.css';


const Square = ({ handleClick, index, color, value }) => {
  return (
    <span >
      <button className="square-tile"
      type="button"
      onClick={() => handleClick(index)}
      style={{backgroundColor: color}}>{value}</button>
    </span>
  );
};

export default Square;
