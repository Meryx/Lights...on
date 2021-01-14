import React from 'react';
import Row from './Row';
import './board.css';

const Board = ({ size, tiles, handleClick }) => {

  return (
    <div className="board">
      {Array(size).fill(null).map((_, i) =>
        <Row
        tiles={tiles}
        size={size}
        key={i}
        index={i}
        handleClick={handleClick}/>
      )}
    </div>
  )
};

export default Board;
