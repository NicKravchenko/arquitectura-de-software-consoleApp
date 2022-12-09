const Person = require("./person");
const fs = require("fs");
const prompt = require("prompt-sync")();

// person = new Person("s", "s", 1);
var activeScreenName = "showWelcomeScreen";

var rawdata = fs.readFileSync("config.json");
var config = JSON.parse(rawdata);

const screenBuilder = (activeScreenName) => {
  const conf = config;
  let activeScreen = [];

  conf.forEach((element) => {
    if (activeScreenName === element.screenName) {
      activeScreen = element;
    }
  });

  console.log(activeScreen);
};

screenBuilder(activeScreenName);
