import React from "react";
import '../styles/SudokuGrid.css';

const SudokuResult = () => {
  const displayMatrix = (matrix) => (
    <div className="sudoku-grid">
      {Array.from({ length: 9 }).map((_, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
          {Array.from({ length: 9 }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell result-cell"
            >
              {matrix[rowIndex][colIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const gridData = JSON.parse(localStorage.getItem('sudokuData'));

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-8">Sudoku Solution</h1>
      <div className="flex gap-16">
        <div>
          <h2 className="text-xl mb-4">Original</h2>
          {displayMatrix(gridData.original)}
        </div>
        <div>
          <h2 className="text-xl mb-4">Solution</h2>
          {displayMatrix(gridData.solution)}
        </div>
      </div>
    </div>
  );
};

export default SudokuResult;