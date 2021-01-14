import React, { useState } from 'react';
import Board from './components/Board';
import './app.css';

function App() {
  const DEFAULT_SIZE = 3;
  const [state, setState] = useState({
    background: Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(false),
    value: Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(""),
    congratulations: false,
    counter: 0,
    size: DEFAULT_SIZE
  })

  let solution = [];






  const handleSetValue = (values) => {
    setState({
      ...state,
      background: Array(state.size * state.size).fill(false),
      counter: 0,
      value: values.map((item) => item ? "*" : ""),
      congratulations: false,
    });
  };


  const handleSetSize = (newSize) => {
    setState({
      background: Array(newSize * newSize).fill(false),
      value: Array(newSize * newSize).fill(""),
      congratulations: false,
      counter: 0,
      size: newSize,
    });


  };



  const xor = (a, b) => {
    return a ? !b : b;
  };

  const getNeighbours = (index) => {
    const neighbours = [];
    const tempSize = state.size;

    if(index % tempSize !== 0){
      neighbours.push(index - 1);
    }

    if(index % tempSize !== tempSize - 1){
      neighbours.push(index + 1);
    }

    if(index >= tempSize){
      neighbours.push(index - tempSize);
    }

    if(index < tempSize * (tempSize - 1)){
      neighbours.push(index + tempSize);
    }

    return neighbours;
  };

  const xorSum = (neighbours, tempTiles) => {
    const reducer = (sum, item) => {
      return xor(sum, item);
    };
    const filtered = tempTiles.filter((tile, i) => {
      const value = neighbours.find((j) => j === i);
      return value || value === 0;
    });



    return filtered.reduce(reducer);

  }

  const reset = () => {
    setState({
      ...state,
      background: Array(state.size * state.size).fill(false),
      value: Array(state.size * state.size).fill(""),
      counter: 0,
      congratulations: false
    });


  }



  const visualize = async (parameterTiles) => {
    const tempTiles = parameterTiles.slice();
    let tempValues = state.value.slice();
    for(let i = 0; i < parameterTiles.length; i++){
      await new Promise(r => setTimeout(r, 500));
      tempValues = tempValues.map((item, j) => j !== i ? item : tempTiles[i]);
      handleSetValue(tempValues);
    }
  }

  const validate = (parameterTiles) => {
    const tempTiles = parameterTiles.slice();
    for(let i = 0; i < tempTiles.length; i++){
      const neighbours = getNeighbours(i);
      const sum = xorSum(neighbours.concat(i), tempTiles);

      if(!sum){
        return false;
      }
    }

    solution = tempTiles.slice();
    return true;

  }

  const solve = (parameterTiles, index) => {

    if(index === parameterTiles.length){
      validate(parameterTiles);
      return;
    }


    const tempTiles = parameterTiles.slice();


    solve(tempTiles.slice(), index + 1);
    solve(tempTiles.map((item, i) => i === index ? !item : item), index + 1);

  }

  const startSolving = () => {
    reset();
    const tempTiles = Array(state.size * state.size).fill(false);

    solve(tempTiles, 0);
    visualize(solution);
  }

  const handleClick = (index) => {
    const tempTiles = state.background.slice();
    const tempValues = state.value.slice();
    tempTiles[index] = !tempTiles[index];
    tempValues[index] = "";

    const neighbours = getNeighbours(index);

    for(let i of neighbours){
      tempTiles[i] = !tempTiles[i];
    }

    const cond = tempTiles.find((item) => !item);
    if(cond === undefined){
      setState({
        ...state,
        background: tempTiles,
        value: tempValues,
        counter: state.counter + 1,
        congratulations: true,
      });
      return;
    }

    setState({
      ...state,
      background: tempTiles,
      value: tempValues,
      counter: state.counter + 1
    });

  }

  return (
    <div className="app">
      <div className="header">
        <h1>Lights...on?</h1>
      </div>
      <div className="game">
        <div className="controls">
          <select className="config-selection" onChange={(e) => {
                handleSetSize(parseInt(e.target.value));
              }}>
                {Array(3).fill(null).map((_, i) => {
                  return(
                    <option value={i+3} key={i}>
                      {i+3}
                    </option>
                  )
                })}
            </select>
            <button onClick={reset}>Clear</button>
            {state.size < 5
            ? <button onClick={startSolving}>Solve</button>
            :''}
          </div>
          <div className="congratulations">
            <p style={{color: state.congratulations ? "#3bba9c" : "#43455c"}}>Congratulations, you did it!</p>
          </div>
        <Board tiles={state} size={state.size} handleClick={handleClick}/>
      </div>
      <div className="counter">
        <p>Moves: {state.counter}</p>
      </div>
      <div className="rules">
        <p>To win, all squares must be lit (green).
           click "solve" to run the algorithm and it will show you where to click to win.</p>
      </div>
    </div>
  );
}

export default App;
