import React from 'react';
import Square from './Square';
import './row.css';

const Row = ({ size, index, tiles, handleClick }) => {
  return (
    <div className="row">
      {Array(size).fill(null).map((_ ,i) =>
        <Square color={tiles.background[(index * size) + i] ? "#3bba9c" : "#2e3047"}
        value={tiles.value[(index * size) + i]}
        key={i}
        index={(index * size) + i}
        handleClick={handleClick}/>
      )}
    </div>
  )
}

export default Row;
