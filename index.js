const Person = require("./person");
const fs = require("fs");
const prompt = require("prompt-sync")();

// person = new Person("s", "s", 1);
var activeScreenName = "showWelcomeScreen";

var rawdata = fs.readFileSync("config.json");
var config = JSON.parse(rawdata);
let repeatLogic = true;
let activeScreen = [];

const screenBuilder = (activeScreenName) => {
  const conf = config;

  conf.forEach((element) => {
    if (activeScreenName === element.screenName) {
      activeScreen = element;
    }
  });

  const { content } = activeScreen;
  const { screenMessage } = content;
  const { actions } = content;

  // console.log(activeScreen);
  console.log();

  console.log(screenMessage);

  console.log("Go to next screen:");

  actions.forEach((element) => {
    console.log(element);
  });

  const input = prompt("Screen: ");

  if (input == "q") return;

  actions.forEach((element) => {
    if (element.button == input) {
      activeScreenName = element.screenName;
      screenBuilder(activeScreenName);
    }
  });
};

screenBuilder(activeScreenName);
