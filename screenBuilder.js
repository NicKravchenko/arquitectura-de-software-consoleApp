const fs = require("fs");
const prompt = require("prompt-sync")();
var rawdata = fs.readFileSync(`${__dirname}/config.json`);
var config = JSON.parse(rawdata);

module.exports = function screenBuilder(activeScreenName) {
  const conf = config;
  let activeScreen = [];

  //Choose active screen
  conf.forEach((element) => {
    if (activeScreenName === element.screenName) {
      activeScreen = element;
    }
  });

  //Define screen parts
  const { content } = activeScreen;
  const { screenMessage } = content;
  const { actions } = content;

  console.log(screenMessage);

  console.log("Go to next screen:");

  //Show possible actions
  actions.forEach((element) => {
    console.log(element);
  });

  const input = prompt("Screen: ");

  //Exit if pressed q
  if (input == "q") return;

  //Call screen
  actions.forEach((element) => {
    if (element.button == input) {
      activeScreenName = element.screenName;
      screenBuilder(activeScreenName);
    }
  });
};
