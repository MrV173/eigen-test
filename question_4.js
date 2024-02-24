const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculate_matrix(number) {
  const n = number.length;

  let diagonal_1 = 0;
  let diagonal_2 = 0;

  for (let i = 0; i < n; i++) {
    diagonal_1 += number[i][i];
  }

  for (let i = 0; i < n; i++) {
    diagonal_2 += number[i][n - 1 - i];
  }

  const difference = Math.abs(diagonal_1 - diagonal_2);

  return difference;
}

function inputMatrix(size, callback) {
  const array = [];

  function inputRow(row) {
    rl.question(`Input row number ${row + 1} (seperate with space): `, (rowInput) => {
      const rowArray = rowInput.split(" ").map(Number);
      array.push(rowArray);

      if (row === size - 1) {
        callback(array);
      } else {
        inputRow(row + 1);
      }
    });
  }

  inputRow(0);
}

rl.question("Please input the size of the matrix ('example: if you want 3 x 3 please input 3') ", (size) => {
  const matrixSize = parseInt(size, 10);

  inputMatrix(matrixSize, (matrix) => {
    const response = calculate_matrix(matrix);
    console.log("The result is:", response);

    rl.close();
  });
});
