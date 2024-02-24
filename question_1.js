const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function reverseString(string) {
  const letters = string.match(/[a-zA-Z]/g);
  const reversedLetters = letters.reverse().join("");
  const numbers = string.match(/\d+/);
  const response = reversedLetters + (numbers ? numbers[0] : "");

  return response;
}

rl.question("Please write the string: ", (string) => {
  const response = reverseString(string);
  console.log("result:", response);

  rl.close();
});
