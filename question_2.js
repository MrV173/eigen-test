const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function find_the_longest_word(sentence) {
  const words = sentence.split(" ");
  let longest_word = "";

  for (const word of words) {
    if (word.length > longest_word.length) {
      longest_word = word;
    }
  }

  return longest_word;
}

rl.question("Input the sentence: ", (sentence) => {
  const longest_word = find_the_longest_word(sentence);
  console.log("the longest word is:", longest_word);

  rl.close();
});
