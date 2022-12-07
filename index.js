console.log("First line");

const Person = require("./person");
const fs = require("fs");

// person = new Person("s", "s", 1);

let rawdata = fs.readFileSync("config.json");
let config = JSON.parse(rawdata);

const readInput = () => {};

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showWelcomeScreen = () => {
  const { showWelcomeScreen } = config;
  console.log(showWelcomeScreen.welcomeMessage);
  console.log();
  console.log(...showWelcomeScreen.actions);
};

const input = readline.question("Check input:", (inp) => {
  console.log(`it'ssss ${inp}!`);
  readline.close();
});
