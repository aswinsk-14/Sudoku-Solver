from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Input and output model for the Sudoku board
class SudokuRequest(BaseModel):
    board: List[List[int]]

class SudokuResponse(BaseModel):
    solution: Optional[List[List[int]]] = None
    message: str

# Sudoku-solving logic
def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False

    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            if board[i][j] == num:
                return False

    return True

def solve_sudoku(board):
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                for num in range(1, 10):
                    if is_valid(board, row, col, num):
                        board[row][col] = num
                        if solve_sudoku(board):
                            return True
                        board[row][col] = 0
                return False
    return True

@app.post("/solve", response_model=SudokuResponse)
async def solve_sudoku_endpoint(request: SudokuRequest):
    board = request.board

    # Validate the board dimensions
    if len(board) != 9 or any(len(row) != 9 for row in board):
        raise HTTPException(
            status_code=400, detail="Invalid board dimensions. Must be 9x9."
        )

    # Check for invalid values
    if any(any(cell < 0 or cell > 9 for cell in row) for row in board):
        raise HTTPException(
            status_code=400, detail="Board values must be between 0 and 9."
        )

    # Make a copy to avoid modifying the input directly
    solution = [row[:] for row in board]

    if solve_sudoku(solution):
        return SudokuResponse(solution=solution, message="Sudoku solved successfully!")
    else:
        return SudokuResponse(solution=None, message="No solution exists for the provided Sudoku.")

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)