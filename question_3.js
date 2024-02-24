const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input_query_object(input_array, query_array) {
  const object = {};

  for (const word of input_array) {
    object[word] = (object[word] || 0) + 1;
  }

  const queryCounts = query_array.map((word) => object[word] || 0);

  return queryCounts;
}

rl.question("Enter the INPUT array (separate by spaces): ", (inputString) => {
  rl.question("Enter the QUERY array (separate by spaces): ", (queryString) => {
    const input_array = inputString.split(" ");
    const query_array = queryString.split(" ");

    const result = input_query_object(input_array, query_array);
    console.log("OUTPUT =", result);

    rl.close();
  });
});
