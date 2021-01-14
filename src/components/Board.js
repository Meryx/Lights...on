import React from 'react';
import Row from './Row';
import './board.css';

const Board = ({ size, tiles, handleClick }) => {

  return (
    <div className="board">
      {Array(size).fill(null).map((_, i) =>
        <Row
        background={tiles.background}
        value={tiles.value}
        size={size}
        key={i}
        index={i}
        handleClick={handleClick}/>
      )}
    </div>
  )
};

export default Board;
