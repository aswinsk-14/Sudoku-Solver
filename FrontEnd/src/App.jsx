import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SudokuInput from "./Components/SudokuInput";
import SudokuResult from "./Components/SudokuResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SudokuInput />} />
        <Route path="/result" element={<SudokuResult />} />
      </Routes>
    </Router>
  );
};

export default App;
