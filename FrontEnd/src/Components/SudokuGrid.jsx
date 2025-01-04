import React from "react";
import '../styles/SudokuGrid.css';

const SudokuGrid = ({ gridValues, handleInputChange }) => {
  const rows = 9;
  const columns = 9;

  return (
    <div className="sudoku-grid">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => {
            const index = rowIndex * columns + colIndex;
            return (
              <input
                type="text"
                key={index}
                className="grid-cell"
                value={gridValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={1}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;