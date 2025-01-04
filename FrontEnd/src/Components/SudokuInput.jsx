import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SudokuGrid from "./SudokuGrid";
import Button from "./Button";

const SudokuInput = () => {
  const [gridValues, setGridValues] = useState(Array(81).fill(""));
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const updatedValues = [...gridValues];
      updatedValues[index] = value;
      setGridValues(updatedValues);
    }
  };

  const convertToMatrix = () => {
    const matrix = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const index = i * 9 + j;
        const value = gridValues[index];
        row.push(value === "" ? 0 : parseInt(value));
      }
      matrix.push(row);
    }
    return matrix;
  };

  const solveSudoku = async () => {
    try {
      const originalMatrix = convertToMatrix();
      const response = await fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board: originalMatrix }),
      });

      const data = await response.json();
      localStorage.setItem('sudokuData', JSON.stringify({
        original: originalMatrix,
        solution: data.solution
      }));
      navigate('/result');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SudokuGrid gridValues={gridValues} handleInputChange={handleInputChange} />
      <Button onClick={solveSudoku}>Solve Sudoku</Button>
    </div>
  );
};

export default SudokuInput;