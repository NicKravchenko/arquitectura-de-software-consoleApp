const Person = require("./person");
const fs = require("fs");
const prompt = require("prompt-sync")();

//Maybe will not be used
var activeScreenName = "showWelcomeScreen";

//Read Screen JSON
var rawdata = fs.readFileSync("config.json");
var config = JSON.parse(rawdata);

function create(config) {
  function screenBuilder(activeScreenName) {
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
  }
}
// screenBuilder("showPersons");
module.exports = create;
